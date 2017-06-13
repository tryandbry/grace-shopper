const db = require('APP/db');
const {Product} = db;
const {expect} = require('chai');

describe('Back-end tests',function(){
  beforeEach('Sync and clear database',function(done){
    db.didSync
    .then(()=>db.sync({force: true}))
    .then(()=>{
      return Product.create({
	name: 'rock',
	cost: 1243.34,
	description: 'I am a rock',
	inventory: 1000,
      })
    })
    .then(()=>done())
    .catch(error=>{
      console.log("err",error);
    });
  });

  describe('Sequelize models',function(){
    let product;

    beforeEach('add one Product instance',function(){
      return Product.findOne()
      .then(data=>{
	product = data;
	//console.log(product.get('name'));
      })
    });

    describe('Product',function(){
      it('instance has the expected schema',function(){
	expect(product.get('name')).to.equal('rock');
	expect(product.get('description')).to.equal('I am a rock');
	expect(product.get('cost')).to.be.a.number;
	expect(product.get('inventory')).to.be.an.integer;
      });
    });
  });
});
