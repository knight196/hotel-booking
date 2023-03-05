const mongoose = require('mongoose')

const productSchema  = new mongoose.Schema(
{
    slug:{type:String, required:true, unique:true},
    title:{type:String,required:true, unique:true},
    rating:{type:String},
    ratingNo:{type:Number},
    service:{type:String},
    country:{type:String},
    image:{type:String},
    images:{type:[String]},
    location:{type:String},
    Details:{type:String},
    Option:{type:String},
    Price:{type:Number},
    rooms:{type:[String]}
},
{
    timestamps:true
}

)

const Product = mongoose.model('Product', productSchema)
module.exports = Product

