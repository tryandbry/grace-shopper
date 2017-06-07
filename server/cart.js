'use strict'

const db = require('APP/db');
const Item = db.model('item');
const Product = db.model('product');
const Cart = db.model('cart');
const User = db.model('user');

/*
Get all Items
Update 1 item
Delete 1 item

see https://github.com/ehacinom/checkpoint-express-review/blob/master/api/index.js

be careful about the posting to productId and not posting to itemId
*/

module.exports = require('express').Router()
    .param('userId', (req, res, next, userId) => {
        // this will run everytime for Cart
        // but not for Checkout? I think
        // do i want to use userId to grab only user instead
        // and not items, and do items elsewhere?
        // is this right way of doing grabbing items/cart right away?
        // CODE REVIEW
        
        if (isNaN(userId)) next(404); // res.sendStatus(404);
        else {
            req.userId = userId;
            
            // gets this specific User!! 
            // should be able to do off req.user using passport
            // but also admin should be able to go to this route
            // where should this go instead/is there somewhere better?
            User
                .findOne({
                    where : { id : userId }
                })
                .then(user => {
                    if (!user) next(404);
                    
                    req.user = user;
                    
                    return Item.findAll({ where : { cart_id : user.cart_id } })
                })
                .then(items => {
                    req.cart = items;
                    next();
                })
                .catch(next);
        }
    })
    .get('/:userId', (req, res, next) => {
        res.send(req.cart)
    })
    .param('itemId', (req, res, next, itemId) => {        
        if (isNaN(itemId)) res.sendStatus(404);
        else {
            req.itemId = itemId;
            
            Item
                .findOne({
                    where : { id : itemId }
                })
                .then(item => {
                    req.item = item;
                    next();
                })
                .catch(next);
        }
    })
    .put('/:userId/:itemId', (req, res, next) => {
                
        // this part still needs doing
        // not sure how to update different fields very well
        // should I do params for itemId?
        // CODE REVIEW
        console.log('here we are updating a cart item /api/cart/:userId/:itemId')
        console.log('ids', req.userId, req.itemId)
        console.log('and finally req.body', req.body)
        
        req.item.update(req.body).then(item => res.status(200).send(item));
    })
    .delete('/:userId/:itemId', (req, res, next) => {
        req.item.destroy().then(() => res.sendStatus(204));
    })
    .post('/:userId/:productId', (req, res, next) => {
        
        ///TONES OF WORK START HERE
        
        // ALTHOUGH THIS IS CALLED productId
        // express routes (!params middleware) 
        // sees it as the same as itemId
        Product
            .findOne({
                where : { id : req.params.productId }
            })
            .then(product => {
                const item = {
                    product: product,
                    cost: product.cost,
                    quantity: req.body.quantity // is this right
                };
                
                ///// I THINK THIS WILL NEED TO NAME
                /// the actual association
                // http://docs.sequelizejs.com/manual/tutorial/associations.html#creating-with-associations
                // also like
                // include the other associations
                // item belongsTo product
                // order hasmany item
                // cart hasmany item
                
                const options = {
                    include : [{
                        association : Product 
                    }]
                }
                return Item.create(item, options);
            })
            .then(item => {
                
            })
            .catch(next);
    })
    
    
    
    
    