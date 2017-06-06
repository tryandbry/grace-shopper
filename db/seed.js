'use strict'
const Promise = require('bluebird');

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

//BEGIN random generator functions
const generateFloat = (upperBound)=>Math.random()*upperBound;

const generateInteger = (lowerBound,upperBound)=>{
  let delta = upperBound - lowerBound;

  return lowerBound + Math.floor(Math.random()*delta);
}

const generateReview = ()=>{
  var desc = [
    "This rock was AMAZING!  I would definitely recommend others to buy it",
    "Very durable.  Like a rock!",
    "Crumbly.  Mistakes were made >:(",
    "Hey everyone, check out my new album on MySpace!  It totally rocks!",
    "Avid user for 10 years!  My rock is still going strong.  Great purchase.",
    "Is this from Outer SPACE?!",
    "I eat rocks for breakfast.  Like Chuck Norris.",
    "If you do not forward this rock to 10 people, then you will smell bad :)",
  ];
  
  var random = generateInteger(0,desc.length-1);
  return desc[random];
}

const generateRockDescription = ()=>{
  var desc = [
    "Aged for millions of years in a cheese cave.  Coveted by collectors for its delicious aroma.",
    "Shiny like a diamond.  'cuz it's a diamond.",
    "It's a rock.",
    "Humble in appearance, but tough as rocks!",
    "Classic rock from the 80s and 90s",
    "A porous rock perfect for exfoliation in the shower or classroom.",
    "wa wa wee wa!",
  ];
  
  var random = generateInteger(0,desc.length-1);
  return desc[random];
}

var rocks = [
  { name: "icky-icky", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "microbead", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "pyrite", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "azurite", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "peanutty", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "trilobite", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "gypsum", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "obsidian", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "slate", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "malachite", image: "/img/FILL_ME_IN", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
];

var users = [
  { email: "peter@familyguy.com", name: "Peter Griffin" },
  { email: "pikachu@pokemon.com", name: "Pika Pikachu" },
];

var categories = [
  "ugly",
  "pretty",
  "retiscent",
  "bargain",
  "baller",
];

var reviews = [
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
  { rating: String(generateInteger(1,5)), text: generateReview() },
];

if(module === require.main){
  let promiseArray = db.didSync
  .then(()=>{
    let promises = [];
    //populate Product
    promises.push(Product.bulkCreate(rocks));
    //populate User
    promises.push(User.bulkCreate(users));
    //populate Category
    promises.push(Category.bulkCreate(categories));
    //populate Review
    promises.push(Review.bulkCreate(reviews));

    return promises;
  });

  Promise.all(promiseArray)
  .then(()=>console.log("db seeded"))
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
