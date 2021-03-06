'use strict'
const chalk = require('chalk');

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs'),
      Sequelize = require('sequelize');

module.exports = db => db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: Sequelize.VIRTUAL, // Note that this is a virtual, and not actually stored in DB
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  triggerNewPassword: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  indexes: [{fields: ['email'], unique: true}],
  getterMethods: {
    fullName: function(){
      return this.firstName + " " + this.lastName;
    },
  },
  setterMethods: {
    name: function(value){
      var arr = value.split(' ');

      this.setDataValue('firstName', arr.slice(0,1).join(' '));
      this.setDataValue('lastName', arr.slice(1).join(' '));
    },
  },
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    attributes: {exclude: ['password_digest']}
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    }
  }
})

// module.exports.associations = (User, {OAuth, Review, Order, Cart}) => {
module.exports.associations = (User, {OAuth, Review, Bom, Cart}) => {
  User.hasOne(OAuth);
  User.hasMany(Review);
  User.hasMany(Bom);
  User.belongsTo(Cart);
}

function setEmailAndPassword(user) {
  console.log(chalk.bold.green("Executing setEmailAndPassword!"));
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
