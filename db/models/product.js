'use strict'

const Sequelize = require('sequelize');

module.exports = db => db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull : false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "/img/FILL_ME_IN",
  },
  cost: {
    type: Sequelize.DECIMAL(10,2),
    defaultValue: 0.00,
  },
  description: {
    type: Sequelize.STRING(1000),
    defaultValue: "I'm a great rock!",
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 1000,
  },
})

module.exports.associations = (Product, {Category, Review}) => {
  Product.belongsToMany(Category, {through: 'product_category'});
  Product.hasMany(Review);
}
