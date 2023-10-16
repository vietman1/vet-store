//COMMON PATTERNS FOR UPDATING ARRAYS IN STATE
const shoppingCart = [
    { id: 1, product: "HDMI Cable", price: 4 },
    { id: 2, product: "Easy Bake Oven", price: 28 },
    { id: 3, product: "Peach Pie", price: 6.5 }
];

//ADDING TO AN ARRAY WITH SPREAD OPERATOR
[...shoppingCart, { id: 4, product: 'Apple', price: 5 }]


// REMOVE AN ELEMENT
const newShoppingCart = shoppingCart.filter((eachItem) => eachItem.id !==2);

// UPDATING ALL ELEMENT IN AN ARRAY

const a = shoppingCart.map((eachItem) => {
    return eachItem.product.toLocaleLowerCase()
})

console.log(a)
[ 'hdmi cable', 'easy bake oven', 'peach pie' ]



const b = shoppingCart.map((eachItem) => {
    return eachItem
})

console.log(b)
[
    { id: 1, product: 'HDMI Cable', price: 4 },
    { id: 2, product: 'Easy Bake Oven', price: 28 },
    { id: 3, product: 'Peach Pie', price: 6.5 }
]



const c = shoppingCart.map((eachItem) => {
return {
    ...eachItem, product: eachItem.product.toLocaleLowerCase()
}
})

console.log(c)
[
    { id: 1, product: 'hdmi cable', price: 4 },
    { id: 2, product: 'easy bake oven', price: 28 },
    { id: 3, product: 'peach pie', price: 6.5 }
]