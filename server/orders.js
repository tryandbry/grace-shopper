'use strict'

const db = require('APP/db');
const Bom = db.model('bom');

/*
These routes are for logged in users to their orders page
guest go to /api/guest/orders
*/

module.exports = require('express').Router()
    .get('/', (req, res, next) => res.status(200).send(req.orders))
    .post('/', (req, res, next) => {
      //TODO: what is this supposed to do?
        res.sendStatus(200)
    })
