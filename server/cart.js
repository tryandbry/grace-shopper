'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');
const Cart = db.model('cart');
const User = db.model('user');

module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        /* 
        Does req.session.cart = state.cart?
          session, logged in : hopefully?
          session, guest : hopefully?
          none, guest : what?
          none, will be logged in : seriously confused
        */

        // note, only api/user/:userId/cart for each user
        // others use api/guest/cart

        console.log(
            'WE ARE GETTING CART',
            'This is req.cart',
            req.cart,
            'This is req.session.cart',
            req.session.cart
        );
        
        req.session.cart = req.cart;
        res.status(200).send(req.cart)
    })
    .post('/', (req, res, next) => {
        /* 
        When creating a new item in the Cart
        You must send as your post (after clicking button on product page)
            req.body = { product , quantity } user/:userid/cart
        */
        
        // put in some checks to make sure the data is formatted correctly

        const product = req.body.product;
        const quantity = req.body.quantity;
        // no discount yet
    
        Item
            .create({
                quantity : Number(quantity),
                cost : product.cost,
                product : product
            }, {
                include : [ Product ]
            })
            .then(item => {
                console.log(
                    'WE ARE NOW POSTING A NEW ITEM TO',
                    '/api/user/:userId/cart/',
                    'This is the req.cart',
                    req.cart,
                    'This is the req.user',
                    req.user,
                    'This is the req.body',
                    req.body,
                    'this is the product',
                    product,
                    'this is the quantity',
                    quantity
                )
            
                // save to session
                req.session.cart.push(item);
            
                // setItems or setItem?
                // THIS IS ALSO NOT GOING TO WORK WELL
                // I THINK
                // cause this is a magic method welp
                return Promise.all(req.cart.setItems([item]), item)
            })
            // .spread((cartPromise, item) => res.status(201).send(item))
            .then(() => res.status(201).send(req.cart)) // return what?
            .catch(next);
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
    .put('/:itemId/', (req, res, next) => {
        /*
        Literally the only thing you can (need to) update is the quantity
        every post to this route sends as req.body = quantity
        */
        console.log('here we are updating a cart item /api/:userId/cart/:itemId')
        console.log('ids', req.userId, req.itemId)
        console.log('and finally req.body', req.body)

        req.item.update(req.body).then(item => res.status(200).send(item));
    })
