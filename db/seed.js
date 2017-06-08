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
//##########################################
const generateFloat = (upperBound)=>Math.random()*upperBound;

//const fuzz = ()=>+`${Date.now()}`.slice(-1)/9;

const generateInteger = (lowerBound,upperBound)=>{
  let delta = upperBound - lowerBound;
  let fuzz = Math.random();

  return lowerBound + Math.round(fuzz*delta);
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
    "I hide my rock with my potatoes.  My life has meaning again.",
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
//##########################################
//END random generator functions

//BEGIN seed data arrays
//##########################################
var users = [
  { email: "peter@familyguy.com", name: "Peter Griffin", cart_id: 1 },
  { email: "pikachu@pokemon.com", name: "Pika Pikachu",  cart_id: 2 },
];

var carts = users.map((e,i)=>({}));

var rocks = [
  { name: "icky-icky", image: "https://s-media-cache-ak0.pinimg.com/236x/e1/5a/d6/e15ad630ac3d4d567fdf17e64c5bd956.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "dino poo", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/A_large_coprolite_%28fossilized_feces_or_dinosaur_poop%29_from_South_Carolina%2C_USA..jpg/220px-A_large_coprolite_%28fossilized_feces_or_dinosaur_poop%29_from_South_Carolina%2C_USA..jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "pyrite", image: "http://www.tysonsfineminerals.com/filemanager/photos/Pyrite59398.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "azurite", image: "http://whataearth.com/wp-content/uploads/2013/12/Azurite__Liufengshan__China_2.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "peanutty", image: "http://pre02.deviantart.net/b442/th/pre/i/2012/097/6/4/peanut_brittle_rock_by_moocow152-d4vbqk1.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "trilobite", image: "http://www.fossilmall.com/Pangaea/patrilos/tr22/pft757b.JPG", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "gypsum", image: "http://www.gemstonebuzz.com/files/gemstone/rough-gypsum.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "kitchen sponge", image: "http://static4.businessinsider.com/image/56817bc0dd0895dc648b457e/your-kitchen-sponge-is-disgusting-and-theres-only-one-good-way-to-clean-it.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "slate", image: "http://williamsslate.com/quarry_slate.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
  { name: "malachite", image: "https://img0.etsystatic.com/152/0/8358778/il_570xN.1112625302_l06f.jpg", cost: generateFloat(1000000), description: generateRockDescription(), inventory: generateInteger(0,10000) },
];

var categories = [
  { name: "ugly" },
  { name: "pretty" },
  { name: "reticent" },
  { name: "bargain" },
  { name: "baller" },
];

var reviews = [
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
  { rating: String(generateInteger(1,5)), text: generateReview(), user_id: generateInteger(1,users.length), product_id: generateInteger(1,users.length) },
];

var pro_cat = [
  [1,5],
  [1,4],
  [2],
  [2],
  [4],
  [5],
  [2,4],
  [1,4],
  [3],
  [2,5],
];

var items = [
  { quantity: 1, cost: 523361.61, discount: .45, cart_id: 1, product_id: 10},
  { quantity: 4, cost: 504562.84, discount: .3, cart_id: 1, product_id: 1},
  { quantity: 2, cost: 311835.84, discount: .67, cart_id: 1, product_id: 8},
];

//##########################################
//END seed data arrays

if(module === require.main){
  /*
  Promise.all(User.bulkCreate(users))
  .then(()=>console.log("done"))
  .catch((error)=>console.log("dammit!",error));
  */
  let promiseArray = db.didSync
  .then(() => db.sync({force: true}))
  .then(()=>{
    let promises = [];
    //populate Cart
    promises.push(Cart.bulkCreate(carts));

    return promises;
  })
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
    //populate Item
    promises.push(Item.bulkCreate(items));

    return promises;
  });

  Promise.all(promiseArray)
  .then(()=>console.log("base information seeded."))

  .then(()=>Product.findAll())
  .then(products=>{
    let promises = products.reduce((sum,product,i)=>{
      sum.push(product.setCategories(pro_cat[i]));
      return sum;
    },[]);
    return Promise.all(promises);
  })
  .then(products=>console.log("set product associations",products))

  // .then(()=>Category.findAll())
  // .then(categories=>{
  //   let promises = categories.reduce((sum,category,i)=>{
  //     sum.push(category.setProducts(cat_pro[i]));
  //     return sum;
  //   },[]);
  //   return Promise.all(promises);
  // })
  // .then(categories=>console.log("set category associations",categories))

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
