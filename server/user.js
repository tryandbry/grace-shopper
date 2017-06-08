'use strict'

const db = require('APP/db')
const User = db.model('user')
const Item = db.model('item')
// const Product = db.model('product')


// TODO
// login with session using post('/')
// write mustBeLoggedIn, other auth filter functions
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

/*
Get all users (forbidden)
Create User
----- mustBeLoggedIn -----
-> param : req.user/userId/cartId/cart
Get User
-> send you off to cart.js
*/


module.exports = require('express').Router()
    .get('/', forbidden('listing users is not allowed'), (req, res, next) =>
        User
            .findAll()
            .then(users => res.json(users))
            .catch(next)
    )
    .post('/', (req, res, next) =>
        User
            .create(req.body)
            .then(user => res.status(201).json(user))
            .catch(err => {
                const message = 'WARNING: we didnt authenticate because of duplicate email'
                console.error(message);
                console.error(err.errors);
            })
    )
    
    /* 
    these routes are only hit by user for their own id
    I am adding a lot of information before the passport
    will add all these things later
    but for now this is how it goes
    
    TODO: authentication
    */
    .use(mustBeLoggedIn)
    .param('userId', (req, res, next, userId) => {
        if (isNaN(userId)) next(404); // res.sendStatus(404);
        else {
            
            // userId
            req.userId = userId;

            User // findById
                .findOne({
                    where : { id : userId }
                })
                .then(user => {
                    if (!user) next(404);

                    // req.user is passport's user info
                    req.user = user;
                    
                    // cartId
                    req.cartId = user.cart_id;
                    
                    // now we want the cart
                    return Item.findAll({ where : { cart_id : req.cartId } })
                })
                .then(items => {
                    req.cart = items;
                    next();
                })
                .catch(next);
        }
    })
    .get('/:userId', (req, res, next) =>
        res.status(200).send(req.user)
    )
    .use('/:userId/cart', require('./cart'))
    
    // this last line moves the cart api to cart.js