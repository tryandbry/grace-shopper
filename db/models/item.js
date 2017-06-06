'use strict'

const Sequelize = require('sequelize');

module.exports = db => db.define('item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  cost: {
    type: Sequelize.DECIMAL(10,2),
    defaultValue: 0.00,
  },
  discount: {
    type: Sequelize.FLOAT,
    defaultValue: 1.00,
  },
});

module.exports.associations = (Item, {Product}) => {
  Item.belongsTo(Product);
}
