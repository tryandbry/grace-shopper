'use strict'

const Sequelize = require('sequelize');

/*
    BOM is our "Bill Of Materials"
    It's an industry term! :]
    It means Order!
*/

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
