'use strict'

const db = require('APP/db');
const Product = db.model('product');
const Category = db.model('category')

/* 
Get all products
Create 1 new product (admin)
Get all categories
// create new category?
Get one category
*/

module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        Product
            .findAll({ include: [{ all: true }] })
            .then(products => res.send(products))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        const product = req.body;
        
        // make sure product has category
        if (!product.category_id || !product.category) 
            res.sendStatus(418);
        else 
            Product
                .create(product)
                .then(() => res.sendStatus(201))
                .catch(next);
    })
    .get('/category', (req, res, next) => {
        Category
            .findAll({})
            .then(categories => res.send(categories))
            .catch(next);
    })
    .get('/category/:categoryId', (req, res, next) => {
        Category
            .findOne({
                where : { id : req.params.categoryId }
            })
            .then(category => res.send(category))
            .catch(next);
    })
