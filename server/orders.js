'use strict'

const db = require('APP/db');
const Bom = db.model('bom');
const Item = db.model('item');

/*
These routes are for logged in users to their orders page
guests go to /api/guest/orders
*/

module.exports = require('express').Router()
    .get('/', (req, res, next) => res.status(200).send(req.orders))
    .post('/', (req, res, next) => {
        const order = req.body;
        
        /////// ORDER
        // flowState: 0,
        // shipAddress1: "",
        // shipAddress2: "",
        // shipCity: "",
        // shipState: "",
        // shipZip: "",
        // paymentAddress1: "",
        // paymentAddress2: "",
        // paymentCity: "",
        // paymentState: "",
        // paymentZip: "",
        // creditcard: "",
        // expiration: "",
        // ccv: "",
        /////// BOM
        // shipping
        // status
        // user_id
        /////// USER
        // email
        // firstName
        // lastName
        

        const shipping = `${order.shipAddress1}\n${order.shipAddress2}\n${order.shipCity}, ${order.shipState} ${order.shipZip}`
        const paymentAddress = `${order.paymentAddress1}\n${order.paymentAddress2}\n${order.paymentCity}, ${order.paymentState} ${order.paymentZip}`

        Bom
            .create({ shipping: shipping })
            .then(order => order.setItems(req.cart.items))
            .then(order => order.setUser(req.user))
            .then(order => Promise.all([order, req.cart.setItems([])]))
            .spread((order, _) => res.status(201).send(order))
            .catch(next)
    })