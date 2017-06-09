'use strict'

const db = require('APP/db')
const User = db.model('user')
const Item = db.model('item')
const Cart = db.model('cart')
const Review = db.model('review')
const Bom = db.model('bom')

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
    .post('/', (req, res, next) => {        
        User
            .create(req.body)
            .then(user => res.status(201).json(user))
            // .catch(next)
            /*
                this is not going well
                this error is dumb and sorta just dissapears
            */
            .catch(err => {
                const message = 'WARNING: we didnt authenticate because of duplicate email'
                res.status(204).send({ message, error: err.errors })
            })
        }
    )
    
    /* 
    these routes are only hit by user for their own id
    I am adding a lot of information before the passport
    will add all these things later
    but for now this is how it goes
    
    TODO: authentication
    */
    // .use(mustBeLoggedIn)
    .param('userId', (req, res, next, userId) => {
        if (isNaN(userId)) next(404); // res.sendStatus(404);
        else {
            
            // userId
            req.userId = userId;

            User // findById
                .findOne({
                    where : { id : userId },
                    include : [ Cart, Review, Bom ]
                })
                .then(user => {
                    if (!user) next(404);
                    
                    console.log('\n\n\n\nuser\n\n\n\n', user)
                    
                    /*
                        
                        JUSTIN
                        TOGGLE THIS LINE
                        IF YOU NEED USER INFORMATION
                        FROM THE USER TABLE
                        
                    */
                    req.account = user;
                    
                    req.cart = user.cart;
                    req.session.cart = user.cart;
                    
                    req.reviews = user.reviews;
                    req.orders = user.boms;
                    
                    next(); // I get a warning that 
// a promise was created in a handler at but was not returned from it, see http://goo.gl/rRqMUw
                })
                .catch(next);
        }
    })
    .get('/:userId', (req, res, next) =>
        res.status(200).send(req.user)
    )
    .use('/:userId/cart', require('./cart'))
    .use('/:userId/review', require('./review'))
    .use('/:userId/orders', require('./orders'))
    
    // this last line moves the cart api to cart.js