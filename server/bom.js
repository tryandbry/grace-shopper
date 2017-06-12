'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Bom = db.model('bom');
const Product = db.model('product');
const router = require('express').Router();

module.exports = router;

router.route('/:id')
// return BOM and associated Items and Products
//TODO: why do we have this as well as an order router if they are getting to the same table (BOM)?
.get(function(req,res,next){
  //find the Bom and eager load Item(s)
  Bom.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Item,
    }
  })
  //for each Item, find related Product 
  .then(bom=>{
    let id = bom.get('items').map(e=>e.get('id'));

    Item.findAll({
      where: {
	id,
      },
      include: {
	model: Product,
      },
    })
    .then(items=>{
      let products = items.map(e=>e.product);
      res.send({bom,products});
    })

  })
  .catch(error=>{
    console.error(error);
    res.sendStatus(500);
  });
});
