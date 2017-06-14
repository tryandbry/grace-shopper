'use strict'

const Sequelize = require('sequelize');

module.exports = db => db.define('review', {
  rating: {
    type: Sequelize.ENUM('0','0.5','1','1.5','2','2.5','3','3.5','4','4.5','5'),
  },
  text: {
    type: Sequelize.STRING(1000),
  },
})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User);
  Review.belongsTo(Product);
}
