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
        let quantity = req.body.quantity
        let cost = req.body.product.cost
        let cartId;
        let userId = req.body.userId
        //let bomId;

        User.findById(userId, {
            include: {
                model: Cart,
            }
        })
                //********************** Need find bomId which can be grabbed using userId ***************
            //**********************grab bomId and add them to newItem********************************
            .then(user => {
                cartId = user.cart.id;
            })
            .then(() => {
        Item.build({
            quantity,
            cost,
            discount: .45,
            product_id: req.body.product.id,
            cart_id: cartId,
            //bom_id: bomId
        }).save()
            .then(() => res.sendStatus(200))
    })

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
