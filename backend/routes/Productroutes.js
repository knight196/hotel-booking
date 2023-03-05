const express = require('express')
const Product = require('../Schema/productModel')
const Flight  = require('../Schema/flightModel')

const productRouter = express.Router()


productRouter.get('/', async (req,res) => {
    const {min,max, ...others} = req.query

    try{
        const hotels = await Product.find({
            ...others,Price:{$gt: min || 0, $lt: max || 9999}
        }).limit(req.query.limit)
        res.status(200).json(hotels)
    }catch(err){
        console.log(err)
    }
})

productRouter.get('/flight', async (req,res) => {

    try{
        const flight = await Flight.find()
        res.status(200).json(flight)
    }catch(err){
        console.log(err)
    }
})


productRouter.get('/flight/:id', async (req,res) => {
    const id = await Flight.findOne({_id:req.params.id})

    if(id){
        res.send(id)
    }else{
        res.status(404).send({message: 'Flight Name not found'})
    }
})

productRouter.get('/slug/:slug', async (req,res) => {
    const product = await Product.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product Not Found'})
    }
})


module.exports = productRouter