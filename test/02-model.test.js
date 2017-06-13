const db = require('APP/db');
const {Product} = db;
const {expect} = require('chai');

describe('Back-end tests',function(){
  beforeEach('Sync and clear database',function(){
    return db.didSync
    .then(()=>db.sync({force: true}))
    .then(()=>{
      return Product.create({
	name: 'rock',
	cost: 1243.34,
	description: 'I am a rock',
	inventory: 1000,
      });
    })
    .catch(error=>{
      console.log("err",error);
    });
  });

  describe('Sequelize models',function(){
    describe('Product',function(){
      it('has the expected schema definition',function(){
	return Product.findAll()
	.then(data=>{
	  console.log("products found:",data)
	});

	//expect(Product.attributes.name).to.be.an('object');
      });
    });
  });
});
