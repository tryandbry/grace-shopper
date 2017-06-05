'use strict'

const Sequelize = require('sequelize');

module.exports = db => db.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
})

module.exports.associations = (Category, {Product}) => {
  Category.belongsToMany(Product, {through: 'CategoryProduct'});
}
