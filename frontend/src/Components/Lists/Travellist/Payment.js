import {useState,useEffect} from 'react'
import { useStateValue } from '../../../StateProvider'
import {CardElement,useElements,useStripe,CardCvcElement,CardExpiryElement,CardNumberElement} from '@stripe/react-stripe-js'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Payment() {

    const navigate = useNavigate()
    
    const [{flightBook,flighttotal,flight,user},dispatch] = useStateValue()


    useEffect(() => {
      localStorage.setItem('flightBook', JSON.stringify(flightBook))
    },[flightBook])
    
    const [clientSecret, setClientSecret] = useState("");
    

const elements = useElements();
const stripe = useStripe();


   useEffect(() => {
     const fetchClientSecret = async () => {
       const data = await axios.post('/payment/create', {
         amount:flighttotal.totalPrice
      })
      setClientSecret(data.data.clientSecret)
    }
    fetchClientSecret()
    console.log('client secret is ', clientSecret)
  },[])

  const handlePayment = async (e) => {
    e.preventDefault();
    
 await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
          card:elements.getElement(CardNumberElement)
        }
      })

  const paymentCreate = await stripe.createPaymentMethod({
    type:'card',
    card:elements.getElement(CardNumberElement)
  })
  const orderId = crypto.randomUUID().slice(0,20)


         axios.post("/orders/flightbooking/add", {
              flightBook: flightBook,
              travelOptions:flight.travelOptions,
              dates:flight.dates,      
              adult:flight.adult,
              child:flight.child,
              infants:flight.infants,        
              email: user?.email,
              amount:flighttotal.totalPrice,
              username:user?.username,
              paymentCreate:paymentCreate.paymentMethod,
              orderId:orderId
            })            


            
              axios.post('/api/sendemail', {
                flightBook:flightBook,
                travelOptions:flight.travelOptions,
                dates:flight.dates,
                adult:flight.adult,
                child:flight.child,
                infants:flight.infants,
                amount:flighttotal.totalPrice,
                paymentCreate:paymentCreate.paymentMethod,
                email:user?.email,
                orderId:orderId
              })
              
        

            navigate('/')
            toast.success('payment successful')
        
  }


 //depart and transit
  
 const timediff = (departTimes,arrivalTimes) => {
      
  const departHrs = departTimes.split(':')[0]
const departMins = departTimes.split(':')[1]

const arrivalHrs = arrivalTimes.split(':')[0]
const arrivalMins = arrivalTimes.split(':')[1]

var startDate = new Date(0,0,0,departHrs,departMins,0)

var endDate = new Date(0,0,0,arrivalHrs,arrivalMins, 0)

var diff = endDate.getTime() - startDate.getTime()

var hours = Math.floor(diff / 1000 / 60 / 60)

diff -= hours * (1000 * 60 * 60)

var minutes = Math.floor(diff/ 1000/60)

if(hours < 0){
  hours = hours + 24
}

return <p>{hours}hrs : {minutes} mins</p>
}


  return (
    <div className="flight-payment d-flex justify-content-between">

<div className="flight-payment-details w-50">

{flightBook.map(item => (
            <>            
            
            <div className="p-2 m-2 bg-secondary bg-opacity-50">
        <h1>Outbound</h1>
    
        <div className="d-flex justify-content-between align-items-center">
            <div className="text-center">
            <img style={{width:'200px',height:'100px'}} src={item.details.Depart?.flightLogo} alt={item.details.Depart?.title}/>
            <p>{item.details.Depart?.Class}</p>
            </div>
            <p>{flight.travelOptions !== 'return' ? flight.date.toDateString() : flight.dates[0].startDate.toDateString()}</p>
        </div>
        <hr></hr>
        
        <div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{item.details.Depart?.Depart}</h3>
        <h2>{item.details.Depart?.DepartTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${item.details.Depart?.DepartTime}`, `${item.details.Depart?.TransitArrival}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{item.details.Depart?.Transit}</h3>
        <h3>{item.details.Depart?.TransitArrival}</h3>
        </div>


        </div>

        <div className="text-center">
        <h5>{item.details.Depart?.Plane}</h5>
        <h5>{item.details.Depart?.FlightNo}</h5>
        </div>

        <hr></hr>
   
        <div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{item.details.Depart?.Transit}</h3>
        <h2>{item.details.Depart?.TransitFlightTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${item.details.Depart?.TransitFlightTime}`, `${item.details.Depart?.ArrivalTime}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{item.details.Depart?.Arrival}</h3>
        <h3>{item.details.Depart?.ArrivalTime}</h3>
        </div>

        </div>

        
        <div className="text-center">
        <h5>{item.details.Depart?.TransitPlane}</h5>
        <h5>{item.details.Depart?.TransitFlightNo}</h5>
        </div>
   
    </div>

    <div className={flight.travelOptions !== 'return' ? 'd-none' : 'd-block'}>


    <div className="p-2 m-2 bg-secondary bg-opacity-50">
        <h1>Return</h1>
        <div className="d-flex justify-content-between align-items-center">
           <div className="text-center">
            <img style={{width:'200px',height:'100px'}} src={item.details.Return?.flightLogo} alt={item.details.Depart?.title}/>
           <p>{item.details.Return?.Class}</p>
           </div>
           <p>{flight.travelOptions !== 'return' ? flight.date.toDateString() : flight.dates[0].endDate.toDateString()}</p>
        </div>

<hr></hr>

<div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{item.details.Return?.Depart}</h3>
        <h2>{item.details.Return?.DepartTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${item.details.Return?.DepartTime}`, `${item.details.Return?.TransitArrival}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>


        <div className="text-center">
        <h3>{item.details.Return?.Transit}</h3>
        <h3>{item.details.Return?.TransitArrival}</h3>
        </div>


        </div>

        <div className="text-center">
          <h5>{item.details.Return?.Plane}</h5>
        <h5>{item.details.Return?.FlightNo}</h5>
        </div>

        <hr></hr>
   
        <div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{item.details.Return?.TransitPlane}</h3>
        <h2>{item.details.Return?.TransitFlightTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${item.details.Return?.TransitFlightTime}`, `${item.details.Return?.ArrivalTime}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>


        <div className="text-center">
        <h3>{item.details.Return?.Arrival}</h3>
        <h3>{item.details.Return?.ArrivalTime}</h3>
        </div>

        </div>

        
        <div className="text-center">
        <h5>{item.details.Return?.TransitPlane}</h5>
        <h5>{item.details.Return?.TransitFlightNo}</h5>
        </div>
      </div>

    </div>


      </>
      ))}
      
      </div>
      <div className="flight-final-payment w-50 p-2 h-100 bg-warning bg-opacity-50">
          <h1>Travellers</h1>
        <div className="d-flex justify-content-between align-items-center">
        <p>Adult:</p>
        <p>{flight.adult}</p>
        </div>
       
        <div className="d-flex justify-content-between align-items-center">
        <p>Child:</p>
        <p>{flight.child}</p>
        </div>
       
        <div className="d-flex justify-content-between align-items-center">
        <p>Infants:</p>
        <p>{flight.infants}</p>
        </div>

        <hr></hr>

        <div className="d-flex justify-content-between align-items-center">
        <p>TotalPrice:</p>
        <p>£{flighttotal.totalPrice}</p>
        </div>

   

      <div className="bg-white bg-opacity-50 p-2">
        
<small>Card Number</small>
<CardNumberElement className="bg-white rounded-1 p-2"/>

<div className="d-flex justify-content-between">
  <div className="w-50">

  <small>Expiry</small>
            <CardExpiryElement className="bg-white p-2 rounded-1"/> 
  </div>
    
            <div style={{marginLeft:'10px'}} className="w-50">
            <small>CVC</small>
            <CardCvcElement className="bg-white p-2 rounded-1"/>
            </div>
</div>
      {/* <CardElement/> */}



      <div className="text-center my-2">
      <button className="border-0 p-2 bg-primary bg-opacity-50 w-100" onClick={handlePayment}>Pay Now</button>
      </div>

      </div>
      </div>
    
    </div>
  )
}
