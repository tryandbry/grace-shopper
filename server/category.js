'use strict'

const db = require('APP/db');
const Category = db.model('category');

/* 
Get all categories
// create new category?
Get one category
// edit category?
*/


module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        Category
            .findAll({})
            .then(categories => res.send(categories))
            .catch(next);
    })
//TODO: id or query for category name
    .get('/:categoryName', (req, res, next) => {
        Category
            .findOne({
                where : { name : req.params.categoryName }
            })
            .then(category => res.send(category))
            .catch(next);
    })
