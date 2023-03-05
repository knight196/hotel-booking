const express = require('express');
const Product = require ('../Schema/productModel')
const data = require ('../data')
const flightdata = require('../flights')
const flightModel = require('../Schema/flightModel')

const seedRouter = express.Router();

seedRouter.get('/', async (req,res) => {
    await Product.remove({})
    const createdProducts = await Product.insertMany(data)
    res.send({createdProducts})
})

seedRouter.get('/flightData', async (req,res) => {
    await flightModel.remove({})

    const createdProducts = await flightModel.insertMany(flightdata)
    res.send({createdProducts})

})


module.exports = seedRouter