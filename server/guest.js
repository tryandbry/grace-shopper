'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');

/*
the entire point of this is to give the guest access to their cart on the session
*/

module.exports = require('express').Router()
    .get('/cart', (req, res, next) => {
        console.log('\n\n\n\n\n\n\n\nSETTING CART')
        if (!req.session.cart) req.session.cart = [];
        console.log(req.session.cart)
        res.status(200).send(req.session.cart)
    })
    .post('/cart', (req, res, next) => {
        const product = req.body.product;
        const quantity = req.body.quantity;
        
        const item = {
            quantity : Number(quantity),
            cost : product.cost,
            product : product
        }
        
        // save to session
        req.session.cart = [...req.session.cart, item];
        
        res.status(201).send(item);
        console.log('item now in cart', req.session.cart)
    })