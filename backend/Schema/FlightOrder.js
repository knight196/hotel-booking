const mongoose = require('mongoose')


const FlightSchema = mongoose.Schema({
    flightBook:Array,
    travelOptions:String,
    email:String,
    amount:Number,
    username:String,
    paymentCreate:Array,
    dates:Array,
    orderId:String,
    adult:{type:Number},
    child:{type:Number},
    infants:{type:Number},
    Cancel:{type:Boolean,default:false},
    Refund:{type:Boolean,default:false}
},
{timestamps:true}
)

module.exports = mongoose.model('flightBook', FlightSchema)