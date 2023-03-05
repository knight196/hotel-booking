const express = require('express')
const User = require('../Schema/User')
const Orders = require('../Schema/Orders');
const adminmessage = require('../Schema/adminmessage')
const productModel = require('../Schema/productModel')
const roomModel = require('../Schema/RoomModel')
const FlightOrder =require('../Schema/FlightOrder')

const router = express.Router();

//update the room
router.get('/rooms/:id', async (req,res) => {
  try{

    const hotel = await productModel.findById(req.params.id)

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return roomModel.findById(room)
      })
    )
res.status(200).json(list)
  }catch(err){
res.status(404).send(err)
  }
})

//create new room and pass it to in the hotel array
router.post('/createRoom/:hotelid', async (req,res) => {

const hotelId = req.params.hotelid

const newRoom = new roomModel(req.body)

try{
  const savedRoom = await newRoom.save()
  try{

    await productModel.findByIdAndUpdate(hotelId, {
      $push:{rooms:savedRoom._id}
    })
  }catch(err){
    res.status(404).send(err)
  }
  res.status(200).json(savedRoom)
}catch(err){
res.status(404).send(err)
}
})

//update the room by id
router.put('/roomsupdate/:id', async (req,res) => {
  
  try{
    const updateRoom = await Room.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new:true}
      )
      res.status(200).json(updateRoom)
  }catch(err){
    res.status(404).send(err)
  }
})

//finding specific user's order by one id from admin

router.get('/orders/_id/:id', async (req,res) => {
  const orderId = await Orders.findOne({orderId:req.params.id})
  if(orderId){
    res.send(orderId)
  }else{
    res.status(404).send({message:"User's order not found"})
  }
})


//finding specific users's flight book by one id from admin
router.get('/flightid/:id', async (req,res) => {
  const orderId = await FlightOrder.findOne({orderId:req.params.id})
  if(orderId){
    res.send(orderId)
  }else{
    res.status(404).send({message:"User's order not found"})
  }
})

//finding specific user id contactmessage
router.get('/usermsg/:id', async (req,res)=> {
const contactId = await adminmessage.findOne({_id:req.params.id})
if(contactId){
 res.send(contactId)
}else{
  res.status(404).send({message:'Orders not found'})
}
})

//get all user

router.get('/users', async (req,res) => {
const users = await User.find();

res.json({
  users:users
})

})

//get user orders

router.get('/orders', async (req,res) => {
const orders = await Orders.find()

res.json({
  orders:orders
})
})

//get user flightbook
router.get('/flightbook', async (req,res) => {
const flightorder = await FlightOrder.find()

res.json({
  flightorder:flightorder
})
})

//send update update to user
router.post('/adminmessage', async (req,res)=> {
const adminmsg = await adminmessage.create(req.body)

res.status(201).json({
  success:true,
  adminmsg
})
})


//user's orders msg in admin 
router.get('/adminmessage', async (req,res)=> {
const adminmsg = await adminmessage.find()
res.json({
  adminmsg:adminmsg
})
})



//unwanted message delete
router.delete('/adminmessage/:id', async (req,res)=> {
try{
  const deleteadminmsgId = await adminmessage.findByIdAndDelete(req.params.id)
  if(!req.params.id){
    return res.status(400).send()
  }
  res.send(deleteadminmsgId)
}catch (err){
  res.status(500).send(err)
}
})

  // cancel order update from user dashboard
  router.put('/get/:id', async (req,res)=> {
    try{
      const cancelId = await Orders.findOne({orderId:req.params.id})
  
      const cancelOrder = await Orders.findOneAndUpdate(
        {orderId: req.params.id},
        {Cancel:!cancelId.Cancel}
      )
  
      return res.status(200).json(cancelOrder)
  
    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })

 //flightBook cancel order update from user dashboard
  router.put('/flightBookCancel/:id', async (req,res)=> {
    try{
      const flightcancel = await FlightOrder.findOne({orderId:req.params.id})
  
      const Cancelflight = await FlightOrder.findOneAndUpdate(
        {orderId: req.params.id},
        {Cancel:!flightcancel.Cancel}
      )
  
      await Cancelflight.save();
  
      return res.status(200).json(Cancelflight)
  
    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })

  // delete flight booking from admin dashboard
router.delete('/flightget/:id', async (req,res)=> {
  try{
    const deleteId = await FlightOrder.findOneAndDelete(req.params.id)
    if(!req.params.id){
      return res.status(400).send()
    }
    res.send(deleteId)
  }catch(err){
    res.status(500).send(err)
  }
  })
  


  
module.exports = router