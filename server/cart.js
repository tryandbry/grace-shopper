'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');
const Cart = db.model('cart');
const User = db.model('user');

/*
These routes are for logged in users to their cart
guests go to /api/guest/cart
*/

module.exports = require('express').Router()
    .get('/', (req, res, next) => res.status(200).send(req.cart.items))
    .post('/', (req, res, next) => {
        const product = req.body.product;
        const quantity = Number(req.body.quantity);
        // no discount yet
        
        // don't create item if exists
        const indexOfItem = req.cart.items
            .reduce((index, item, i) =>
                index || (item.product.id == product.id) ? i : index
            , undefined);

        console.log(
            'hitting post to user/id/cart',
            '\nindex of item', indexOfItem, isNaN(indexOfItem),
            '\nproduct', product,
            '\nquantity', quantity
        )
        
        // possibly shouldn't use update instance method
        // https://github.com/sequelize/sequelize/issues/2910
        
        if (isNaN(indexOfItem))
            Item
                .create({
                    quantity : quantity,
                    cost : product.cost,
                    updated_at : Date.now()
                })
                .then(item => Product
                    .findById(product.id)
                    .then(product => item.setProduct(product))
                )
                .then(item => {
                    req.cart.setItems([...req.cart.items, item]) // this line seems super jenk
                    res.status(201).send(item)
                })
                .catch(next);
        else            
            Item
                .findById(req.cart.items[indexOfItem].id)
                .then(item => item.update({ 
                    quantity: item.quantity + quantity, 
                    // updated_at : Date.now() 
                }))
                .then(item => res.status(200).send(item))
                .catch(next);
    })
    .param('productId', (req, res, next, productId) => {
        if (isNaN(productId)) res.sendStatus(404);
        else {
            Item
                .findOne({ where : { product_id : +productId } })
                .then(item => {
                    if (!item) next(404);
                    
                    req.item = item;
                    next();
                })
                .catch(next);
        }
    })
    .put('/:productId', (req, res, next) => {
        /*
        Literally the only thing you can (need to) update is the quantity
        every post to this route sends as req.body = { quantity }
        */
        console.log('\n\nhere we are updating a cart item /api/:userId/cart/:itemId')
        console.log('ids', req.userId, req.params.productId)
        console.log('item', req.item)
        console.log('and finally req.body', req.body)

        req.item
            .update(req.body)
            // .then(item => item.update({ updated_at: Date.now() }))
            .then(item => res.status(200).send(item))
            .catch(next);
    })
    .delete('/:productId', (req, res, next) => {
        req.item.destroy().then(() => res.sendStatus(204));
    })
