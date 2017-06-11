'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');
const Cart = db.model('cart');
const User = db.model('user');

module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        // note, only api/user/:userId/cart for each user
        // others use api/guest/cart
        
        req.session.cart = req.cart;
        res.status(200).send(req.cart)
    })
    .post('/', (req, res, next) => {
        /*
        When creating a new item in the Cart
        You must send as your post 
        (after clicking button on product page)
            req.body = { product , quantity } user/:userid/cart
        */

        // put in some checks to make sure the data is formatted correctly

        console.log('hitting post to user/id/cart')

        const product = req.body.product;
        const quantity = Number(req.body.quantity);
        // no discount yet
        
        // don't create item if exists
        const indexOfItem = req.cart
            .reduce((index, item, i) =>
                index || (item.product.id == product.id) ? i : index
            , null);

        if (isNaN(indexOfItem))
            Item
                .create({
                    quantity : quantity,
                    cost : product.cost,
                })
                .then(item => Product
                    .findById(product.id)
                    .then(product => item.setProduct(product))
                )
                .then(item => {
                    req.cart.setItems([item])
                    res.status(201).send(item)
                })
                .catch(next);
        else {
            /* 
            Possibly should
            
            req.cart[indexOfItem]
                .getItem({ where : { id : item.id } })
                .then(item => item
                    .update({ 
                        key : 'quantity',
                        value : quantity
                    })
                )
                .then(item => {
                    // req.cart should be auto updated hopefully??
                    
                    res.status(204).send(item)
                })
                .catch(next);
                
            
            
            also possibly shouldn't use update instance method
            https://github.com/sequelize/sequelize/issues/2910
            
            */
            
            
            
            const item = req.cart[indexOfItem];
            Item
                .findById(item.id)
                .then(item => item
                    .update({ 
                        key : 'quantity',
                        value : quantity
                    })
                )
                .then(item => {
                    /* 
                    question : if I update a value, does the cart also 
                    update automatically? does sequlize update my associations
                    too?
                    */
                    console.log('\n\n\n\nIf I update a value, does the cart also update? This is in /api/user/:userId/cart POST with item already inside of cart.')
                    console.log(req.cart)
                    // req.cart.setItems()
                    res.status(204).send(item)
                })
                .catch(next);
        }
        
    })
    .param('itemId', (req, res, next, itemId) => {
        if (isNaN(itemId)) res.sendStatus(404);
        else {

            // itemId
            req.itemId = itemId;

            Item
                .findById(itemId)
                .then(item => {
                    // item
                    req.item = item;
                    next();
                })
                .catch(next);
        }
    })
    .delete('/:itemId', (req, res, next) => {
        req.item.destroy().then(() => res.sendStatus(204));
    })
    .put('/:itemId', (req, res, next) => {
        /*
        Literally the only thing you can (need to) update is the quantity
        every post to this route sends as req.body = quantity
        */
        console.log('here we are updating a cart item /api/:userId/cart/:itemId')
        console.log('ids', req.userId, req.itemId)
        console.log('and finally req.body', req.body)

        req.item.update(req.body).then(item => res.status(200).send(item));
    })
