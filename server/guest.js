'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');

/*
the entire point of this is to give the guest access to their cart on the session
*/

module.exports = require('express').Router()
    .get('/cart', (req, res, next) => {
        // if (!req.session.cart) req.session.cart = [];
        if (!req.session.cart) req.session.cart = {};

        // because cart is now an object (for aggregating items)
        // we need to send back to the component an array
        const cart = Object
            .keys(req.session.cart)
            .map(key => req.session.cart[key]);
        res.status(200).send(cart)
    })
    .post('/cart', (req, res, next) => {
        const product = req.body.product;
        const quantity = req.body.quantity;
        let item;
        
        // check to see if product is already in cart
        if (req.session.cart[product.id]) {
            item = req.session.cart[product.id]
            console.log('\n\n\n\nproduct in cart')
            console.log(item)
            console.log('original', item.quantity)
            item.quantity = item.quantity + quantity;
            console.log(`original + ${quantity}`, req.session.cart[product.id])
        } else {
            item = {
                quantity : Number(quantity),
                cost : product.cost,
                product : product
            }
            // save to session
            req.session.cart[product.id] = item;
            console.log('product NOT in cart')
        }
        res.status(201).send(item);
        console.log('item now in cart', req.session.cart)
    })