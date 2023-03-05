const mongoose = require('mongoose')

const AdminMessage = new mongoose.Schema(
    {
        order_id: String,
        flight_id:String,
        message: String,
        replymsg: String,
        subject: String,
        description: String,
        message_id: String,
        user_replymsg: String,
        username: String,
        email: String,
        user: String,
        admin:String,
        to:String
    },
    {
        timestamps: true
    }
)

const adminmsg = mongoose.model('adminmsg', AdminMessage)

module.exports = adminmsg