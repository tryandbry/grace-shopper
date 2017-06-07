const db = require('APP/db');
const Product = db.model('product');
const Category = db.model('category');
const Review = db.model('review');
const Cart = db.model('cart');
const User = db.model('user');

const QUERY = {
  include: [{
    model: Category,
    through: {
      attributes: ['name'],
    },
  }],
};

console.log(Object.keys(Product.__proto__));
Product.findAll(QUERY)
.then(products=>{
  console.log("products:",products[0]);
  console.log("product 0 categories",products[0].dataValues.categories[0]);
  //console.log(Object.keys(products[0].__proto__));
})
.catch(error=>console.error(error));
