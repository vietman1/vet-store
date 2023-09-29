//Express
const express = require('express');
const app = express()
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//EJS
app.set('view engine', 'ejs')
const path = require('path');
app.set('views', path.join(__dirname, 'views'))

//EJS-mate: boilerplate
const ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate)


// Json & form parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Serving static files
app.use(express.static(path.join(__dirname, 'public')))




//Mongoose =>>>
const mongoose = require('mongoose')
const Product = require('./models/product')
const Review = require('./models/review')
const User = require('./models/user')


require('dotenv').config()

const dbUrl = process.env.DB_URL
// const dbUrl = 'mongodb://127.0.0.1:27017/VET'
console.log(dbUrl)
mongoose.connect(dbUrl)
    .then(() => {
        console.log('Mongo connected!')
    })
    .catch((err) => {
        console.log(`Error connecting to Mongoose: ${err}`)
    })






// AUTHENTICATION WITH PASSPORT  =>>>
// Passport.js with local strategy:
const passport = require('passport');
const LocalStrategy = require('passport-local')

//Sessions=>>>
const session = require('express-session');
//Defining session configs that we will pass into app.use
const sessionConfig = {
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

//SESSIONS =>>> needs to be before app.use(passport.session())
app.use(session(sessionConfig))



// AUTHENTICATION WITH PASSPORT  =>>>
// Initialize passport authen, it should be before any routes that handle user authen
app.use(passport.initialize());
//This is to saved users' data from passport in sessions (ids)
app.use(passport.session())
//Configure passport to use LocalStrategy (required above)
passport.use(new LocalStrategy(User.authenticate()));
//Serialize/de-serialize = convert complex data to save it db then convert it back to its original format
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



//res.locas => we are creating local variables and passing them to all routes so it can be used in all routes / templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})


// test FB plug-in
app.get('/facebook', (req, res) => {
    res.render('testFB.ejs')
})

//*************** AUTHENTICATION ROUTES ***************

app.get('/register', async (req, res) => {
    res.render('users/register')
})

//Validate if the user exists then saves to db
app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body)

    //we need {} because User contructor expects 1 object to be passed (following our user schema)
    const user = new User({ username, email })

    //Pass in to check if the username exists. If no => passport will create a new field of {username, salt, hash} in the db
    const newUser = await User.register(user, password)

    res.redirect('/home')
})


app.get('/login', async (req, res) => {
    res.render('users/login')
})

// Submit login form
// passport.authenticate('strategy',{options}) => can add flash here
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    console.log(req.body)
    res.redirect('/home')
})

//Docs suggest us using POST/DELETE to prevent hacks
app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });



app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user)
    } else {
        res.send('not Signed')
    }
})

//*************** PRODUCT ROUTES ***************

app.get('/', async (req, res) => {
    const products = await Product.find({})
    res.render('products/home.ejs', { products })
})

// HOME: MY HOMEPAGE
app.get('/home', async (req, res) => {
    const products = await Product.find({})
    res.render('products/home.ejs', { products })
})


app.get('/about', async (req, res) => {
    res.render('about.ejs')
})

//APP: SHOW ALL PRODUCTS
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/products.ejs', { products })

})


//SHOW: SHOW DETAILS OF 1 PRODUCT
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`'${id}'`)
        const product = await Product.findById(id).populate('reviews');

        //Rating is going to be the rating of each review, so it will have a value of 1-5. We then will run a loop to add icons equivalent to the rating value. So we create an empty variable - star,  then if a rating is 3 then we will add 3 lines of <i>...</i> (3 icons) to the stars, then return it in the end.
        function getStarIcons(rating) {
            let stars = '';
            for (let i = 1; i <= rating; i++) {
                stars += '<i class="fa-solid fa-thumbs-up"></i>';
            }
            console.log(stars)
            return stars;
        }


        res.render('products/show.ejs', { product, getStarIcons })
    } catch (err) {
        console.log(err)
    }

})



//*************** USER REVIEWS ROUTES ***************
//SHOW: Create a review for a product
app.post('/products/:id/reviews', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        const review = new Review(req.body.review);
        product.reviews.push(review);
        product.save()
        review.save()
        res.redirect(`/products/${id}`)

    } catch (error) {
        next(error)
    }
})






app.listen('80', (req, res) => {
    try {
        console.log('CONNECTED TO PORT 6969')
    } catch (err) {
        console.log('CONNECTION TO PORT 6969 FAILED')
        console.log(err)

    }
})