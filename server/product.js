'use strict'

const db = require('APP/db');
const Product = db.model('product');
const Review = db.model('review');
const User = db.model('user');

// post is only for admin
// delete is only for admin


module.exports = require('express').Router()
    .get('/:id', (req, res, next) => {
        Product.findOne({
            where: { id: req.params.id },
            include: [{ all: true, nested: true }] // eager loading
        })
            .then(product => res.send(product))
    })
    .put('/:id', (req, res, next) => {
        Product.findById(req.params.id)
            .then(product => product.update(req.body))
            .then(updated => res.sendStatus(201))
            .catch(next)
    })
    .delete('/:id', (req, res, next) => {
        Product.destory({
            where: {
                id: req.params.id
            }
        })
            .then(deleted => res.send('Deleted!'))
            .catch(next)
    })

    .get('/:id/reviews', (req, res, next) => {
        Review.findAll({ where: { product_id: req.params.id } })
            .then(reviews => {
                let productRating = reviews.reduce((prev, curr) => {
                    return prev + parseInt(curr.rating)
                }, 0)
                productRating /= reviews.length;
                res.send(`${productRating}`);
            }
            )
    })