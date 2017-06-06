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

if(module === require.main){
  db.didSync
  .then(()=>
    User.create({
      email: "test@test.com",
      name: "Peter Griffin",
    })
  )
  .finally(()=>process.exit(0))
  .catch(console.log);
}
/*
if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(()=>{
      //console.log('LOGGING!', Object.keys(db.User.__proto__));
      console.log('LOGGING!', String(User.create));
      User.create({
	//email: "test@test.com",
	name: "Peter Griffin",
      })
      .then(theuser=>{
	console.log("created user:",theuser);
	return theuser;
      });
    })
    .finally(() => process.exit(0))
    .catch(console.error.bind(console));
}
*/
