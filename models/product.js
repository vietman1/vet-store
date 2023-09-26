const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Product = mongoose.model('Product', productSchema)

const mukutaPro9 = new Product({
    name: 'Mukuta Pro 9',
    price: 888,
    image: 'images/mukuta7.png'
})

// mukutaPro9.save();

module.exports = Product

