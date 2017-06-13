const db = require('APP/db');
const {Product,User} = db;
const {expect} = require('chai');

describe('Back-end tests',function(){
  beforeEach('Sync and clear database',function(done){
    db.didSync
    .then(()=>db.sync({force: true}))
    .then(()=>{
      return Promise.all([
        Product.create({
	  name: 'rock',
	  cost: 1243.34,
	  description: 'I am a rock',
	  inventory: 1000,
	}),
	User.create({
	  email: "test@test.com",
	  name: "First Last",
	  password: "123",
	}),
      ]);
    })
    .then(()=>done())
    .catch(error=>{
      console.log("err",error);
    });
  });

  describe('Sequelize models',function(){

    describe('Product',function(){
      let product;

      beforeEach('retrieve product instance',function(){
	return Product.findOne()
	.then(data=>{
	  product = data;
	  //console.log(product.get('name'));
	})
      });

      it('instance has the expected schema',function(){
	expect(product.get('name')).to.equal('rock');
	expect(product.get('description')).to.equal('I am a rock');
	expect(product.get('cost')).to.be.a.number;
	expect(product.get('inventory')).to.be.an.integer;
      });
    });

    describe('User',function(){
      let user;

      beforeEach('retrieve user instance',function(){
	return User.findOne()
	.then(data=>{
	  user = data;
	})
      });

      it('instance has the expected schema',function(){
	expect(user.get('fullName')).to.equal('First Last');
	expect(user.get('firstName')).to.equal('First');
	expect(user.get('lastName')).to.equal('Last');
	expect(user.get('email')).to.equal('test@test.com');
      });

      it('validates email',function(){
	const newUser = User.build();
	return newUser.validate()
	.then(err=> {
	  expect(err).to.be.an('object');
	  let a = err.errors.filter(e=>
	    e.type == 'notNull Violation' &&
	    e.path == 'email');
	  expect(a).to.not.have.length(0);
	});
      });
    });

  });
});
