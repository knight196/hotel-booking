import {useEffect,useState} from 'react'
import {Link,useLocation} from 'react-router-dom'
import axios from 'axios'
import './Travellist.css'

export default function Travellist() {

  const location = useLocation()


  
  const [depart] = useState(location.state.depart)
  const [arrival] = useState(location.state.arrival)
  const [date] = useState(location.state.date)
  const [travelOptions] = useState(location.state.travelOptions)
  const [flightclass] = useState(location.state.flightclass)
  const [dates] = useState(location.state.dates)

const [data,setdata] = useState([])

const callData = async () => {
  const res = await axios.get(`/api/products/flight`)
  setdata(res.data)
}


useEffect(() => {
  callData()
},[])

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


return <p>{adddiff}hrs{addminutes <= 0 ? <></> : ' : ' + addminutes + 'mins'}</p>
}

  return (
    <div>
      {data.map(data => 
        {
          if(data.Depart?.Arrival === arrival.toString()){
            if(data.Depart?.Class === flightclass){
              return(
              <>
             <div className="flight-details d-flex justify-content-between align-items-center bg-white bg-opacity-50">

<div className="w-100">
<div className="data-card d-flex m-2 p-2 w-100 justify-content-between align-items-center bg-white bg-opacity-50">

<div className="text-center">
<img style={{width:'200px', height:'100px'}} src={data.Depart?.flightLogo} alt={data.Depart?.title}/>
<p className="bg-primary text-white py-2">{data.Depart?.Class}</p>
</div>

<div className="data-details w-50 d-flex justify-content-between align-items-center">

<div>
<h5>{data.Depart?.DepartCodename}</h5>
<p className="h4">{data.Depart?.DepartTime}</p>
<p>{travelOptions !== 'return' ? date.toDateString() : dates[0].startDate.toDateString()}</p>
</div>

<div className="text-center w-100">
  {timediff(data.Depart?.DepartTime,data.Depart?.TransitArrival,data.Depart?.TransitFlightTime,data.Depart?.ArrivalTime)}
<div className="plane">
<i className="fas fa-plane"></i>
</div>
</div>

<div>
<h5>{data.Depart?.ArrivalCodename}</h5>
<p className="h4">{data.Depart?.ArrivalTime}</p>
<p>{travelOptions !== 'return' ? date.toDateString() : dates[0].startDate.toDateString()}</p>
</div>

</div>


</div>

<div className={travelOptions !== 'return' ? 'd-none' : 'data-card d-flex m-2 p-2 w-100 justify-content-between align-items-center bg-white bg-opacity-50'}>

<div className="text-center">
<img style={{width:'200px', height:'100px'}} src={data.Return?.flightLogo} alt={data.Depart?.title}/>
<p className="bg-primary text-white py-2">{data.Return?.Class}</p>
</div>

<div className="data-details w-50 d-flex justify-content-between align-items-center">


<div>
<h5>{data.Return?.ArrivalCodename}</h5>
<p className="h4">{data.Return?.ArrivalTime}</p>
<p>{travelOptions !== 'return' ? date.toDateString() : dates[0].endDate.toDateString()}</p>
</div>

<div className="w-100 text-center">
{timediff(data.Return?.DepartTime,data.Return?.TransitArrival,data.Return?.TransitFlightTime,data.Return?.ArrivalTime)}
<div className="plane">
<i className="fas fa-plane left-plane"></i>
</div>
</div>

<div>
<h5>{data.Return?.DepartCodename}</h5>
<p className="h4">{data.Return?.DepartTime}</p>
<p>{ dates[0].endDate.toDateString()}</p>
</div>

</div>





</div>

</div>

<div className="w-50 text-center">
<Link to={`/api/products/flight/${data._id}`}>
<button className="border-0 px-2 py-1 rounded-1 text-white bg-warning">View Details</button>
</Link>
</div>


</div>
              </>
              )
            }
            }
          }
          )}
    </div>
  )
}
