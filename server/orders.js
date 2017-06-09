'use strict'

module.exports = require('express').Router()
    .get('/', (req, res, next) => {
        res.send(req.orders);
    })