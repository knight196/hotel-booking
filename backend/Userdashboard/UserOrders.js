const Orders = require('../Schema/Orders');
const express = require('express')
const usermessage = require('../Schema/usermessage')
const adminmessage = require('../Schema/adminmessage')
const roomModel = require('../Schema/RoomModel')
const FlightOrder = require('../Schema/FlightOrder')
const router = express.Router()



//qty update in room
router.put('/qtyroom/:id', async (req,res) => {

  const {qty} = req.body

try{

const qtyroomupdate = await roomModel.findOneAndUpdate(
  {_id:req.params.id},
  {$set:{availabelRooms:qty }}
)

res.status(200).json(qtyroomupdate)
}catch(err){
  res.status(404).send(err)
}

})


//finding specific order by one id from user

router.get('/get/_id/:id', async (req,res) => {
    const orderId = await Orders.findOne({orderId:req.params.id})

    if(orderId){
      res.send(orderId)
    }else{
        res.status(404).send({message:'bookings not found'})
    }
})

//finding flightbooking info by one id from user
router.get('/flightid/:id', async (req,res) => {
  const orderId = await FlightOrder.findOne({orderId:req.params.id})

    if(orderId){
        res.send(orderId)
    }else{
        res.status(404).send({message:'bookings not found'})
      }
})


// delete orders from user dashboard
 router.delete('/get/:id', async (req,res)=> {
   try{
    const deleteId = await Orders.findOneAndDelete(req.params.id)
    if(!req.params.id){
      return res.status(400).send()
    }
    res.send(deleteId)
  }catch(err){
    res.status(500).send(err)
  }
})


//hotel book
router.post('/booking/add', (req,res) => {
  const products = req.body.basket
    const email = req.body.email
    const username = req.body.username
    const amount = req.body.amount
    const availabelRooms = req.body.availabelRooms
    const availabelRoomId = req.body.availabelRoomId
    const orderId = req.body.orderId
    
    const orderDetail = {
        products:products,     
        availabelRooms:availabelRooms,
        availabelRoomId:availabelRoomId,
        orderId:orderId,
        email:email,
        username:username,
        amount:amount
    }


    Orders.create(orderDetail,(err,result) => {
        if(err){
            console.log(err)
        }else {
            console.log('order added to database', result)
        }
    })
})

router.post('/get', (req,res) => {
  const email = req.body.email
  
  Orders.find((err, result) => {
    if(err){
      console.log(err)
    }else{
      const userOrders = result.filter((order) => order.email === email)
      res.send(userOrders)
    }
})

})

//flight booking
router.post('/flightbooking/add', (req,res) => {
  const flightBook = req.body.flightBook
  const travelOptions = req.body.travelOptions
  const dates = req.body.dates
  const adult = req.body.adult
  const child = req.body.child
  const infants = req.body.infants
  const email = req.body.email
  const username = req.body.username
  const amount = req.body.amount
  const paymentCreate = req.body.paymentCreate
  const orderId = req.body.orderId

  const orderDetail = {
      flightBook:flightBook,     
      travelOptions:travelOptions,
      dates:dates,
      adult:adult,
      child:child,
      infants:infants,
      paymentCreate,
      email:email,
      username:username,
      amount:amount,
      orderId:orderId
  }


  FlightOrder.create(orderDetail,(err,result) => {
      if(err){
          console.log(err)
      }else {
          console.log('order added to database', result)
      }
  })
})

router.post('/flightBook/get', (req,res) => {
  const email = req.body.email

FlightOrder.find((err, result) => {
  if(err){
      console.log(err)
  }else{
      const flightOrders = result.filter((order) => order.email === email)
      res.send(flightOrders)
  }
})

})

//hotel find by id
router.get('/get/_id/:id', async (req,res) => {
  const orderId = await Orders.findOne({orderId:req.params.id})

  if(orderId){
      res.send(orderId)
  }else{
      res.status(404).send({message:'bookings not found'})
  }
})

//finding flightbooking info by one id from user
router.get('/flightid/:id', async (req,res) => {
  const orderId = await Orders.findOne({orderId:req.params.id})

  if(orderId){
      res.send(orderId)
  }else{
      res.status(404).send({message:'bookings not found'})
  }
})


// delete orders from user dashboard
router.delete('/get/:id', async (req,res)=> {
try{
  const deleteId = await Orders.findOneAndDelete(req.params.id)
  if(!req.params.id){
    return res.status(400).send()
  }
  res.send(deleteId)
}catch(err){
  res.status(500).send(err)
}
})
// delete flight booking from user dashboard
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


//finding contact msg from user
router.get('/addcontactmsg/_id/:id', async (req,res)=> {
    const contactId = await usermessage.findOne({_id:req.params.id})
    if(contactId){
     res.send(contactId)
    }else{
      res.status(404).send({message:'Orders not found'})
    }
  })

  //ordersmsg send to admin 
router.post('/adminmessage', async (req,res)=> {
    const adminmsg = await adminmessage.create(req.body)
    
    res.status(201).json({
      success:true,
      adminmsg
    })
    
    })

      //add additional confirm message in user
  router.post('/addusermessage/', async(req,res)=> {
    const usermsg = usermessage.create(req.body)

    res.status(201).json({
      success:true,
      usermsg
    })

  })

    //filtering of each user message
    router.post("/getusermessage", (req, res) => {
        const username = req.body.username;
      
        usermessage.find((err, result) => {
          if (err) {
            console.log(err);
          } else {
            const usermsg = result.filter((order) => order.username === username);
            res.send(usermsg);
          }
        });
      });
      
       //delete the message 
  router.delete('/usermessage/:id', async (req,res)=> {
    try{
      const deleteusermsgId = await usermessage.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteusermsgId)
    }catch (err){
      res.status(500).send(err)
    }
  })


module.exports = router

