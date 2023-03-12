const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv')
const path = require('path')
const authRoutes = require('./routes/routesauth')
const Admindashboard = require('./Admindashboard/AdminOrders');
const Userdashboard = require('./Userdashboard/UserOrders');
const seedRouter = require('./routes/seedroutes')
const productRouter = require('./routes/Productroutes')
const nodemailer = require('nodemailer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const puppeteer = require('puppeteer')
const handlebars = require('nodemailer-express-handlebars')



dotenv.config({path:path.resolve(__dirname,'./.env')});

const stripe = require('stripe')('sk_test_51MNEWyA7EeqkrrQuviOm21iAgTN76jHlDmH5lb6HAfubkEWzxcIXfFvMv3JxsAp93l3urJz2v3zSIHraqitbRUPR000fnrtkiA')


const app = express();
const port = process.env.PORT || 5000

//middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/seed', seedRouter)
app.use('/api/', Admindashboard)
app.use('/orders/', Userdashboard)
app.use('/api/products', productRouter)
// app.use(cors())

//connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)



//stripe payment

app.post("/payment/create", async (req, res) => {
  const {amount} = req.body
  try {

    const paymentIntent = await stripe.paymentIntents.create({    
      currency: "GBP",
      amount: amount * 100,
      payment_method_types:['card']
    });

    // Send publishable key and PaymentIntent details to client
    res.json({clientSecret: paymentIntent.client_secret});
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const compile = async (templateName,data) => {
  const filepath = path.join(process.cwd(),`${templateName}.hbs`)

const html = await fs.readFile(filepath,'utf-8')

return hbs.compile(html)(data)

}

hbs.registerHelper('slice', function(passedString){

 return passedString.slice(0,10)

})

hbs.registerHelper('conditional', function (passedData) {

  return passedData !== 'return'

})


app.post('/api/sendemail', async(req,res) => {
  const {flightBook,orderId,paymentCreate,adult,child,infants,dates,travelOptions,amount,email} = req.body

  
  try{
    const browser =await puppeteer.launch({
      ignoreDefaultArgs:['--disable-extensions']
    });

 const page = await browser.newPage();


  
    const content = await compile('flight', {flightBook,orderId,paymentCreate,adult,child,infants,dates,travelOptions,amount,email})

    await page.setContent(content)


    await page.pdf({
      path:'flight.pdf',
      format:'A4',
      printBackground:true
    })



  var transporter = nodemailer.createTransport({
    service:'hotmail',
    auth:{
      user:process.env.user,
      pass:process.env.pass
    }
  })

  var handlebarOptions = {
    viewEngine:{
      extName:'hbs',
      defaultLayout:false,
      layoutDir:'./flight'
    },
  }

  transporter.use('compile', handlebars(handlebarOptions))

    var mailOptions = {
      from:process.env.user,
      to:email,
      subject:'Booking confirmation',
      text:'Thank you for booking your flight with us. If you have any problems do not hesitate to contact us.',
      attachments:[{
        filename:'flight.pdf',
        path:'flight.pdf'
      }]
    
    }
    

  await transporter.sendMail(mailOptions)

  res.status(200).json({success:true, message:'Email Sent'})
  await browser.close()

}catch(err){
  res.status(500).json(err.message)
}
})

const hotelCompile = async (templateName,data) => {

const filepath = path.join(process.cwd(), `${templateName}.hbs`)

const html = await fs.readFile(filepath,'utf-8')

return hbs.compile(html)(data)

}

hbs.registerHelper('datesplit', function(passedData){

  return passedData.slice(0,10)

})


app.post('/api/hotelemail', async (req,res) => {

const {basket,travel,availabelRooms,availabelRoomId,amount,email,orderId} = req.body

  try{

    const browser = await puppeteer.launch()
  

    const page = await browser.newPage();

  
    const content = await hotelCompile('hotel', {orderId,basket,travel,availabelRooms,availabelRoomId,amount,email})

    await page.setContent(content)

    await page.pdf({
      path:'hotel.pdf',
      format:'A4',
      printBackground:true
    })



    var transporter = nodemailer.createTransport({
      service:'hotmail',
      auth:{
        user:process.env.user,
        pass:process.env.pass
      }
    })

    var mailOptions = {
      from:process.env.user,
      to:email,
      subject:'Hotel Confirmation',
      text:'Thank you for booking your hotel with us. If you have any problems do not hesitate to contact us.',
      attachments:[{
        filename:'hotel.pdf',
        path:'hotel.pdf'
      }]
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({success:true,message:'email sent'})
  
    await browser.close()
    
    process.exit()
    
  }catch(err){
    res.status(500).json(err.message)
  }
  })



app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))





// app.use('/', (req,res)=> res.send('homepage'))

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
  })


