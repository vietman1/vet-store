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


//Node-cron: Cronjob
const cron = require('node-cron');
module.exports = cron;

// cron.schedule('*/2 * * * * *', () => {
//     console.log('running a task every second');
//   });

//Mongoose
const mongoose = require('mongoose')
const Product = require('./models/product')
const Review = require('./models/review')

require('dotenv').config()

const dbUrl = process.env.DB_URL
// const dbUrl = 'mongodb://127.0.0.1:27017/VET'
console.log(dbUrl)
mongoose.connect(dbUrl)
    .then(() => {
        console.log('Mongo connected!')
    })
    .catch((err) =>{
        console.log(`Error connecting to Mongoose: ${err}`)
    })



// test FB plug-in
app.get('/facebook', (req,res) =>{
    res.render('testFB.ejs')
})

//*************** PRODUCT ROUTES ***************

app.get('/',async(req,res) =>{
    const products = await Product.find({})
    console.log(products)
    res.render('home.ejs', {products})
})

// HOME: MY HOMEPAGE
app.get('/home', async(req,res) =>{
    const products = await Product.find({})
    console.log(products)
    res.render('home.ejs', {products})
})


app.get('/about', async(req, res) =>{
    res.render('about.ejs')
})

//APP: SHOW ALL PRODUCTS
app.get('/products', async(req,res) => {
    const products = await Product.find({})
    res.render('products.ejs', {products})    

})


//SHOW: SHOW DETAILS OF 1 PRODUCT
app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
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


        res.render('show.ejs', {product, getStarIcons})
    } catch (err) {
        console.log(err)
    }

})



//*************** USER REVIEWS ROUTES ***************
//SHOW: Create a review for a product
app.post('/products/:id/reviews', async(req, res, next) => {
    try {
        const {id} = req.params;
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






app.listen('6969',(req,res) => {
    try {
        console.log('CONNECTED TO PORT 6969')
    } catch (err) {
        console.log('CONNECTION TO PORT 6969 FAILED')
        console.log(err)
        
    }
})