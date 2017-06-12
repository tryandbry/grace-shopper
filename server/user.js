'use strict'

// const { User, Item, Cart, Review, Bom, Product }, db = require('APP/db')
const db = require('APP/db')
const User = db.model('user')
const Item = db.model('item')
const Cart = db.model('cart')
const Review = db.model('review')
const Bom = db.model('bom')
const chalk = require('chalk');
const Product = db.model('product')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

/*
Get all users (forbidden)
Create User
----- mustBeLoggedIn -----
-> param : req.user/userId/cartId/cart
Get User
-> send you off to cart.js

// TODO
// write mustBeLoggedIn, other auth filter functions
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.


Browser warning
    when I call next() in the app.param('userId')
    I get a warning that 
    a promise was created in a handler at but was not returned from it, 
    see http://goo.gl/rRqMUw
*/


module.exports = require('express').Router()
    .get('/', forbidden('listing users is not allowed'), (req, res, next) =>
        User
            .findAll()
            .then(users => res.json(users))
            .catch(next)
    )
    .post('/', (req, res, next) => {        
	console.log(chalk.bold.red("POST to /api/user/"),req.body);
	Promise.all([User.create(req.body),Cart.create()])
	    .then(data=>{
		console.error(chalk.bold.red("Create new user and cart"),data);
		data[0].setCart(data[1])
		.then(user=>{
		    res.send(user);
		});
	    })
            .catch(err => {
		console.error(chalk.bold.red("Unable to create new user"),err);
		res.sendStatus(500);
            })
        }
    )
    
    /* 
    these routes are only hit by user for their own id
    I am adding a lot of information before the passport
    req.user
    will add all these things
    but for now this is how it goes
    
    */

    // .use(mustBeLoggedIn)
    .param('userId', (req, res, next, userId) => {
        if (isNaN(userId)) next(404);
        else {
            // userId
            req.userId = userId;

            User
                .findOne({
                    where : { id : userId },
                    // include : [ Cart, Review, Bom ]
                    // include : [{ all: true, nested: true }]
                    include : [
                        { model: Cart, include: [{ model: Item, include: [ Product ] }] },
                        { model: Review, include: [ Product ] },
                        { model: Bom, include: [ Item ] } // items, user
                    ]
                })
                .then(user => {
                    if (!user) next(404);
                    
                    // *all* user information -> all eagerly loaded welp
                    req.account = user;
                    
                    // grab cart items off req.cart.items
                    req.cart = user.cart 
                    
                    // arrays with reviews and orders
                    req.reviews = user.reviews;
                    req.orders = user.boms;
                    
                    next();
                })
                .catch(next);
        }
    })
    .get('/:userId', (req, res, next) =>
        res.status(200).send(req.user)
    )
    .use('/:userId/cart', require('./cart'))
    .use('/:userId/orders', require('./orders'))
    
    // this last line moves the cart api to cart.js
