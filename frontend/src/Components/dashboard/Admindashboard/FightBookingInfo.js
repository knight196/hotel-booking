import {useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useStateValue} from '../../../StateProvider'
import {useParams} from 'react-router-dom'

export default function FlightBookingInfo() {

  const {id} = useParams()

  const [flightBook,setbooking] = useState([])

  const fetchData = async () => {
    const res = await axios.get(`/api/flightid/${id}`)
    setbooking(res.data)
  }

  useEffect(() => {
    fetchData(flightBook.flightBook)
  },[])

  const [cancelBooking, setCancelBooking] = useState(flightBook)

  const cancel = async (id) => {

   await axios.put(`/api/flightBookCancel/${id}`)
   await axios.post('/orders/addusermessage', {
     order_id:flightBook?.orderId,
     flight_id:flightBook?.orderId,
     username:flightBook?.username,
     message:'Your order has been cancelled'
   })
   await axios.post('/orders/adminmessage', {
     order_id:flightBook?.orderId,
     flight_id:flightBook?.orderId,
     username:flightBook.username,
     message:`You have cancelled ${flightBook?.username} order`
   })
   toast.success("You have cancelled user's order");
   setTimeout(function(){
   window.location.href="/admin"
   },1500)
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
    <div className="my-2">
      
{flightBook.flightBook?.map(item => (
  <div className="d-flex justify-content-between">
<div>
            <div className="p-2 m-2 bg-secondary bg-opacity-50">
<h1>Outbound</h1>
<div className="d-flex justify-content-between align-items-center">
<div className="text-center d-flex justify-content-between align-items-center w-100">

  <div>
<img style={{width:'200px',height:'100px'}} src={item.details.Depart?.flightLogo} alt={item.details.Depart?.title}/>
<p>{item.details.Depart?.Class}</p>
  </div>

<div>
  {flightBook.dates[0].startDate.slice(0,10)}
</div>

</div>
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

<div className={flightBook.travelOptions !== 'return' ? 'd-none' : "p-2 m-2 bg-secondary bg-opacity-50"}>
<h1>Return</h1>
<div className="d-flex justify-content-between align-items-center">
<div className="text-center d-flex justify-content-between align-items-center w-100">

<div>
<img style={{width:'200px',height:'100px'}} src={item.details.Return?.flightLogo} alt={item.details.Depart?.title}/>
<p>{item.details.Return?.Class}</p>
</div>

<div>
  {flightBook.dates[0].endDate.slice(0,10)}
</div>


</div>
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
<h3>{item.details.Return?.Transit}</h3>
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


<div className="bg-secondary bg-opacity-50 w-50 m-2 p-2 h-100">

<div className="d-flex justify-content-between align-items-center">
      <p>Adult:</p>
      <p>{flightBook.adult}</p>
    </div>
    
    <div className="d-flex justify-content-between align-items-center">
      <p>Child:</p>
      <p>{flightBook.child}</p>
    </div>
    
    <div className="d-flex justify-content-between align-items-center">
      <p>infants:</p>
      <p>{flightBook.infants}</p>
    </div>

<hr></hr>

<div className="d-flex justify-content-between align-items-center">
      <p>Amount:</p>
      <p>£{flightBook.amount}</p>
    </div>

{flightBook.paymentCreate?.map(item => (
<>
<small style={{fontWeight:'bold'}}>Payment Info</small>
<div className="d-flex justify-content-between align-items-center">
<small>Card: <i className={`h6 fa-brands fa-cc-${item.card.brand}`}></i></small>
<small>Ending in: {item.card.last4}</small>
</div>
</>
))}
<hr></hr>



<div className={flightBook.Cancel === false ? 'd-none': 'd-block text-center h2'}>
<p>Cancelled</p>
<hr></hr>
</div>

<button className={cancelBooking === flightBook.orderId === flightBook.Cancel === true ? 'border-0 w-100 px-2 py-1 bg-warning d-block' : 'd-none'}
onClick={()=>{cancel(flightBook.orderId);setCancelBooking(flightBook.orderId,!cancelBooking)}}>Cancel</button>

</div>
</div>
))}

  </div>

  )
}
