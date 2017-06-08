'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');
const Cart = db.model('cart');
const User = db.model('user');

module.exports = require('express').Router()
    .get('/', (req, res, next) =>
        res.status(200).send({ "hey": "hey", "cart": req.cart })
    )
    .post('/', (req, res, next) => {
        console.log('what is inside me? ', req.body)
        let quantity = req.body.quantity
        let cost = req.body.product.cost
        let cartId;
        User.findById(req.body.userId, {
            include: {
                model: Cart
            }
        })
            //**********************grab userId and cartId and add them to newItem********************************
            .then(user => {
                console.log('user!#M!#$MM!#$M#M$M#M$M#$M ', user);
                // console.log(Object.keys(newItem.__proto__));
                res.sendStatus(200);
            })

       
        // let newItem = Item.build({
        //     quantity,
        //     cost,
        //     discount: .45
        // })
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
