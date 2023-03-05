import {useState,useEffect} from 'react'
import {useNavigate,useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { useStateValue } from '../../../StateProvider';

export default function TraveInfo() {

  const navigate = useNavigate()

    const {id} = useParams();

    const [details,setDetails] = useState([])

    const [{flight,user},dispatch] = useStateValue()
  
    const fetchData = async () => {
      const res = await axios.get(`/api/products/flight/${id}`)
      setDetails(res.data)
    }
  
    useEffect(() => {
      fetchData()
    },[id])
    
    console.log(flight)

    // const [cartItems,setcartItems] = useState([])

    // const onAdd = (product) => {
    //   const exist =  cartItems.find((x) => x.id === product.id)
    //   if(exist){
    //     setcartItems(cartItems.map((x) => x.id === product.id ? {
    //       ...exist, qty: exist.qty +1 
    //     }: x))
    //   }else{
    //     setcartItems([...cartItems, {...product, qty:1}])
    //   }
    //   navigate('/Payment')
    // }
    
    var adult  = details.Depart?.Price * flight.adult 

    var child = details.Depart?.Price * 0.5 * flight.child 

    var singleDepart = adult + child


    var returnPriceAdult = (details.Depart?.Price + details.Return?.Price) * flight.adult

    var returnPriceChild = (details.Depart?.Price + details.Return?.Price) * 0.5 * flight.child 

    var twoWayPrice = returnPriceAdult + returnPriceChild

    
    const addtoBasket = () => {
      dispatch({
        type:'FLIGHT_DATA',
        payload:{details}
      })
      if(flight.travelOptions !== 'return'){
        dispatch({
          type:'FLIGHT_TOTAL',
          payload:{
           totalPrice: singleDepart
          }
        })
      }else {
        dispatch({
          type:'FLIGHT_TOTAL',
          payload:{
            totalPrice: twoWayPrice
          }
        })
      }
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
    <>
    <div className="p-2 m-2 bg-secondary bg-opacity-50">
    <h1>Outbound</h1>
<div className="d-flex justify-content-between align-items-center">
            <div className="text-center">
            <img style={{width:'200px',height:'100px'}} src={details.Depart?.flightLogo} alt={details.Depart?.title}/>
            <p>{details.Depart?.Class}</p>
            </div>
            <p>{flight.travelOptions !== 'return' ? flight.date.toDateString() : flight.dates[0].startDate.toDateString()}</p>
        </div>
        <hr></hr>
        
        <div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{details.Depart?.Depart}</h3>
        <h2>{details.Depart?.DepartTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${details.Depart?.DepartTime}`, `${details.Depart?.TransitArrival}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{details.Depart?.Transit}</h3>
        <h3>{details.Depart?.TransitArrival}</h3>
        </div>

        </div>

        <div className="text-center">
        <h5>{details.Depart?.Plane}</h5>
        <h5>{details.Depart?.FlightNo}</h5>
        </div>

        <hr></hr>
   
        <div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{details.Depart?.Transit}</h3>
        <h2>{details.Depart?.TransitFlightTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${details.Depart?.TransitFlightTime}`, `${details.Depart?.ArrivalTime}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{details.Depart?.Arrival}</h3>
        <h3>{details.Depart?.ArrivalTime}</h3>
        </div>

        </div>

        
        <div className="text-center">
        <h5>{details.Depart?.TransitPlane}</h5>
        <h5>{details.Depart?.TransitFlightNo}</h5>
        </div>
        
<div className={flight.travelOptions !== 'return' ? 'd-none' : 'd-block'}>
   <hr></hr>
<div className="p-2 m-2">
        <h1>Return</h1>
        <div className="d-flex justify-content-between align-items-center">
           <div className="text-center">
            <img style={{width:'200px',height:'100px'}} src={details.Return?.flightLogo} alt={details.Depart?.title}/>
           <p>{details.Return?.Class}</p>
           </div>
           <p>{flight.travelOptions !== 'return' ? flight.date.toDateString() : flight.dates[0].endDate.toDateString()}</p>
        </div>

<hr></hr>



<h1>Return</h1>
<div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{details.Return?.Depart}</h3>
        <h2>{details.Return?.DepartTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${details.Return?.DepartTime}`, `${details.Return?.TransitArrival}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{details.Return?.Transit}</h3>
        <h3>{details.Return?.TransitArrival}</h3>
        </div>


        </div>

        <div className="text-center">
        <h5>{details.Return?.Plane}</h5>
        <h5>{details.Return?.FlightNo}</h5>
        </div>

        <hr></hr>
   
        <div className="d-flex justify-content-between align-items-center">
        
        <div className="text-center">
        <h3>{details.Return?.TransitFlight}</h3>
        <h2>{details.Return?.TransitFlightTime}</h2>
        </div>

        <div className="w-100 text-center">
        {timediff(`${details.Return?.TransitFlightTime}`, `${details.Return?.ArrivalTime}`)}
        <div className="plane">
<i className="fas fa-plane"></i>
</div>
        </div>

        <div className="text-center">
        <h3>{details.Return?.Arrival}</h3>
        <h3>{details.Return?.ArrivalTime}</h3>
        </div>

        </div>

        
        <div className="text-center">
        <h5>{details.Return?.TransitPlane}</h5>
        <h5>{details.Return?.TransitFlightNo}</h5>
        </div>

    </div>
       
 
    </div>

</div>

<div className="text-center my-2">
  <Link to={!user ? '/Login' : '/payment'}>
<button className="border-0 w-100 p-2 bg-warning bg-opacity-50" onClick={addtoBasket}>Book Now</button>
  </Link>
</div>
    
    </>
  )
}
