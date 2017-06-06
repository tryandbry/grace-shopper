'use strict'

const db = require('APP/db');
const Product = db.model('product');
const Review = db.model('review');

//post is only for admin
//delete is only for admin


module.exports = require('express').Router()
    .get('/:id', (req, res, next) => {
      Product.findById(req.params.id)
            .then(product => res.send(product))
            .catch(next)
    })
    .post('/:id', (req, res, next) => {
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
      Review.findAll({ where: { user_id: req.params.id } })
            .then(reviews => res.send(reviews))
            .catch(next)
    })
