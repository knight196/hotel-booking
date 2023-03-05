const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        options:{type:String,required:true},
        availabelRooms:{type:Number,required:true},
        price:{type:Number,required:true}
    },
    {
        timestamps:true
    }
)


const RoomModel = mongoose.model('Rooms', RoomSchema)
module.exports = RoomModel
