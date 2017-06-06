'use strict'

const api = module.exports = require('express').Router()

// put in all api backend routes here

api
    .get('/heartbeat', (req, res) => res.send({ok: true}))
    .use('/auth', require('./auth'))
    .use('/user', require('./user'))
    .use('/catalog', require('./catalog'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
