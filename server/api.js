'use strict'

const api = module.exports = require('express').Router()

// put in all api backend routes here

api
    .get('/heartbeat', (req, res) => res.send({ok: true}))
    .use('/auth', require('./auth'))
    .use('/user', require('./user')) // cart is under user
    .use('/guest', require('./guest')) // cart is here
    .use('/catalog', require('./catalog'))
    .use('/product', require('./product'))
    .use('/category', require('./category'))
    .use('/bom', require('./bom'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
