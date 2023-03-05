const  mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    products:Array,
    availabelRooms:Number,
    availabelRoomId:String,
    orderId:String,
    amount:Number,
    email:String,
    username:String,
    Cancel:{type:Boolean,default:false},
},{timestamps:true})

module.exports = mongoose.model('orders', OrderSchema)

