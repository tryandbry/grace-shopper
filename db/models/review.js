'use strict'

const Sequelize = require('sequelize');

module.exports = db => db.define('review', {
  rating: {
    type: Sequelize.ENUM('1','2','3','4','5'),
  },
  text: {
    type: Sequelize.STRING(1000),
  },
})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User);
  Review.belongsTo(Product);
}
