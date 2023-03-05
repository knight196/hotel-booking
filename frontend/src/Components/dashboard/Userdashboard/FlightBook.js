import {useState,useEffect} from 'react'
import '../dashboard.css'
import axios from 'axios'
import {useStateValue} from '../../../StateProvider'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function FlightBook() {

    const [{user},dispatch] = useStateValue()
  

    const [flightBook,setbooking] = useState([])
  
    const getBooking = async () => {
      const res = await axios.post('/orders/flightBook/get', {email:user.email})
      setbooking(res.data)
    }
  
  
    useEffect(() => {
      getBooking()
    },[])
  
  
    const deletelist = async (id) => {
      await axios.delete(`/orders/flightget/${id}`)
      toast.success('Your product has been deleted successfully')
      setTimeout(function (){
       window.location.href="/user"
      },1500)
     }

     //depart and transit
  
const timediff = (departTimes,transitarrival,transitflight,arrivalTimes) => {
      
  const departHrs = departTimes.split(':')[0]
const departMins = departTimes.split(':')[1]

const transitarrivalHrs = transitarrival.split(':')[0]
const transitarrivalMin = transitarrival.split(':')[1]

const transitflightHrs = transitflight.split(':')[0]
const transitflightMin = transitflight.split(':')[1]

const arrivalHrs = arrivalTimes.split(':')[0]
const arrivalMins = arrivalTimes.split(':')[1]

var startDate = new Date(0,0,0,departHrs,departMins,0)

var transitarrivalTime = new Date(0,0,0,transitarrivalHrs,transitarrivalMin,0)

var transitflightTime = new Date(0,0,0,transitflightHrs,transitflightMin, 0)

var endDate = new Date(0,0,0,arrivalHrs,arrivalMins, 0)

var diff = transitarrivalTime.getTime() - startDate.getTime()

var enddiff =  endDate.getTime() - transitflightTime.getTime()

var hours = Math.floor(diff / 1000 / 60 / 60)

var endhours = Math.floor(enddiff/1000/60/60)

var addhrs = hours + endhours

var adddiff = addhrs

diff -= hours * (1000 * 60 * 60)

enddiff -= endhours * (1000*60*60)

var minutes = Math.floor(diff/ 1000/60)

var endminutes = Math.floor(enddiff/1000/60)

var addminutes =minutes + endminutes

if(adddiff < 0){
  adddiff = adddiff + 24
}
 if(addminutes >= 60){
  addminutes = addminutes % 60
  adddiff = adddiff + 1
}

console.log(flightBook)


return <p>{adddiff}hrs{addminutes <= 0 ? <></> : ' : ' + addminutes + 'mins'}</p>
}
  return (
    <div>
        {flightBook.map(flight => (
            <>

            {flight.flightBook.map(item => (
<div className=" p-2 m-2 bg-secondary bg-opacity-50">
<Link style={{textDecoration:'none'}} className="text-dark" to={`/orders/flightid/${flight.orderId}`}>
                
                <div>
                <div className="d-flex justify-content-between align-items-center">

<h1>Outbound</h1>

<p>BookingId :{flight.orderId}</p>

<p  style={{textTransform:'uppercase'}}>{flight.travelOptions}</p>

</div>


        <div>

        <div className="flight-booking d-flex justify-content-between align-items-center">
            <div className="text-center">
            <img style={{width:'200px',height:'100px'}} src={item.details.Depart?.flightLogo} alt={item.details.Depart?.title}/>
            <p>{item.details.Depart?.Class}</p>
            </div>

        <div className="text-center">
        <h3>{item.details.Depart?.Depart}</h3>
        <h2>{item.details.Depart?.DepartTime}</h2>
        </div>

        <div className="w-100">
        {timediff(item.details.Depart?.DepartTime,item.details.Depart?.TransitArrival,item.details.Depart?.TransitFlightTime,item.details.Depart?.ArrivalTime)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{item.details.Depart?.Arrival}</h3>
        <h3>{item.details.Depart?.ArrivalTime}</h3>
        </div>

        </div>
        <div className="text-center d-flex justify-content-between align-items-center">
          <div>
          {flight.travelOptions !== 'return' ? flight.dates[0].startDate.slice(0,10) : flight.dates[0].endDate.slice(0,10)}
          </div>

<div>

        <h5>{item.details.Depart?.Plane}</h5>
        <h5>{item.details.Depart?.FlightNo}</h5>
</div>
        </div>

        </div>



<div className={flight.travelOptions !== 'one-way' ? 'd-block' : 'd-none'}>

<hr></hr>

<h1>Return</h1>

<div className="d-flex justify-content-between align-items-center flight-booking">
<div className="text-center">
<img style={{width:'200px',height:'100px'}} src={item.details.Depart?.flightLogo} alt={item.details.Depart?.title}/>
<p>{item.details.Return?.Class}</p>
</div>

<div className="text-center">
<h3>{item.details.Return?.Arrival}</h3>
<h3>{item.details.Return?.ArrivalTime}</h3>
</div>

<div className="w-100">
  {timediff(item.details.Return?.DepartTime,item.details.Return?.TransitArrival,item.details.Return?.TransitFlightTime,item.details.Return?.ArrivalTime)}
  <div className="plane">
<i className="fas fa-plane left-plane"></i>
</div>
</div>


<div className="text-center">
<h3>{item.details.Return?.Depart}</h3>
<h2>{item.details.Return?.DepartTime}</h2>
</div>

</div>

<div className="text-center">
<h5>{item.details.Return?.TransitPlane}</h5>
<h5>{item.details.Depart?.TransitFlightNo}</h5>
</div>

</div>
          

    </div>
    <p className={flightBook.Cancel !== false ? 'd-none' : 'h3 text-center d-block'}>Cancelled</p>
</Link>

              <div className="d-flex justify-content-end">
    <button onClick={()=>deletelist(flight.orderId)}>Delete</button>
              </div>
              </div>
        ))}
      </>
      ))}
    </div>
  )
}
