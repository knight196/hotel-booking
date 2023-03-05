import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {format} from 'date-fns'
import Searchitem from '../SearchItem/Searchitem'
import axios from 'axios'
import './List.css'

export default function Lists() {

const location = useLocation()

const [destination] = useState(location.state.destination)
const [dates] = useState(location.state.dates)
// const [options] = useState(location.state.options)
const [opendate,setopendate] = useState(false)
const [min,setMin] = useState(undefined)
const [max,setMax] = useState(undefined)
const [country,setcountry] = useState(undefined)

const [data,setdata] = useState([])


// const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// function dayDifference(date1,date2){
//   const timeDiff = Math.abs(date2.getTime() - date1.getTime())
//   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
//   return diffDays
// }

// const days =(dayDifference(dates[0].endDate, dates[0].startDate))

const callData = async () => {
  const res = await axios.get(`/api/products?country=${country || destination}&min=${min || 0}&max=${max || 999}`)
  setdata(res.data)
}
useEffect(() => {
  callData()
},[])

const handleClick = () => {
  callData()
}


  return (
    <div className="d-flex list">

      <div className="bg-warning p-2 search-option">

      <p>Search</p>
      <hr></hr>

      <div>
      <h5>Destination</h5>
      <br></br>
    <input type="text" className="w-100" onChange={e=> setcountry(e.target.value)} placeholder={destination}/>
      </div>

<hr></hr>

      <div>
        <h5>Check-in-date</h5>
        <br></br>
        <p onClick={()=> setopendate(!opendate)} className="bg-white px-2 py-1">{`${format(dates[0].startDate, 'MM/dd/yyyy')} to  ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</p>
      </div>


<hr></hr>

<div>
      <h5>Options</h5>
      <div className="options-per-night">
        <div>
      <span>Min Price <small>per night</small></span>
      <br></br>
      <input  onChange={e=> setMin(e.target.value)} type="number"/>
        </div>
      <div>
      <span>Max Price <small>per night</small></span>
      <br></br>
      <input onChange={e=> setMax(e.target.value)} type="number"/>
      </div>
      </div>
      
</div>

      <hr></hr>

<div className="text-center my-2">
<button className="px-2 py-1 border-0" onClick={handleClick}><i className="fa fa-spinner"></i> Update Search</button>
</div>


      </div>

      <div className="card-list px-2">
        
       {data.map(item => (
         <Searchitem item={item} key={item.id}/>
       ))}
      
      </div>


    </div>
  )
}
