'use strict'

const db = require('APP/db')
    , {
        Cart,
	Category,
	Item,
	OAuth,
	Bom,
	Product,
	Review,
	User,
      } = db;

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(()=>{
      console.log('LOGGING!');
      return User.create({
	email: "test@test.com",
      });
    })
    .then(()=>console.log("test user created"))
    .finally(() => process.exit(0))
    .catch(console.error.bind(console));
}

//module.exports = Object.assign({}, {})
