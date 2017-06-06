'use strict'

const Sequelize = require('sequelize');

module.exports = db => db.define('bom', {
  shipping: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('created','processing','cancelled','completed'),
    defaultValue: 'created',
  },
})

module.exports.associations = (Bom, {Item,User}) => {
  Bom.hasMany(Item);
  Bom.belongsTo(User);
}
