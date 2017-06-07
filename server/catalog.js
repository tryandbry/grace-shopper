'use strict'

const db = require('APP/db');
const Product = db.model('product');
const Category = db.model('category');

/* 
Get all products
Create 1 new product (admin)
*/

module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        Product
            .findAll({ include: Category })
        ////// this is to load only one attribute of the category but not working
            // .findAll({
            //     include : [{
            //         model : Category , through: { attributes: ['id'] }
            //     }] ,
            // })
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
    
