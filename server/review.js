'use strict'
const db = require('APP/db');
const Review = db.model('review');

module.exports = require('express').Router()
    .post('/', (req, res, next) => {
        const rating = req.body.rating;
        const text = req.body.text;
        const productId = req.body.product_id;

        console.log('hit review route/n/n/n/n', rating,text,productId)

        Review.create({
            rating: `${rating}`,
            text,
            user_id: req.user.id,
            product_id: productId
        })
            .then(review => res.sendStatus(201))
            .catch(next);
    })