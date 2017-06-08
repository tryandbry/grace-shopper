'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Bom = db.model('bom');
const Product = db.model('product');
const router = require('express').Router();

module.exports = router;

router.route('/:id')
.get(function(req,res,next){
  Bom.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Item,
    }
  })
  .then(bom=>{
    //console.log("BOM route hit: ",bom);

    let items = bom.get('items');
    //console.log("items:",items);
    let item_ids = items.map(e=>e.get('id'));
    //console.log("item IDs:",item_ids);
    let items2 = Item.findAll({
      where: {
	id: item_ids,
      },
      include: {
	model: Product,
      },
    })
    .then(items=>{
      //console.log("eager loaded items?",snorlax);
      let products =  items.map(e=>e.product);
      res.send({bom,products});
    })

  })
  .catch(error=>{
    console.error(error);
    res.sendStatus(500);
  });
});


















/* 
Get all products
Create 1 new product (admin)
*/


/*
module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        Product
            .findAll({ include: Category })
        ////// this is to load only one attribute of the category but not working
            // .findAll({
            //     include : [{
            //         model : Category , through: { attributes: ['id'] }
            //     }] ,
            // })
            .then(products => res.send(products))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        const product = req.body;
        
        // make sure product has category
        if (!product.category_id || !product.category) 
            res.sendStatus(418);
        else 
            Product
                .create(product)
                .then(() => res.sendStatus(201))
                .catch(next);
    })
    
    */
