import {useState,useEffect} from 'react'
import {DateRange,Calendar} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../Home.css'
import {useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import { useStateValue } from '../../../StateProvider';
import axios from 'axios'

export default function Travel({hide}) {
 
  const [{flight},dispatch] = useStateValue();
  
  const [depart,setDepart] = useState('')
  const [arrival,setArrival] = useState('')
  
    const [openDate,setOpenDate] = useState(false)
  
  
    const [dates,setDates] = useState(
      [
        {
        startDate:new Date(),
        endDate:new Date(),
        key:'selection'
  
  }]
      );

  
      const [options,setOptions] = useState({
        adult:1,
        child:0,
        infants:0,
      })
    
  
      const handleOption = (name,operation) => {
        setOptions(prev=> {return {
          ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] -1,
        }})
      }
  
      const navigate = useNavigate()
  
      
      useEffect(() => {
        localStorage.setItem('flight', JSON.stringify(flight))
      },[flight])
      
      const [travelOptions,settravelOptions] = useState('return')

      const [flightclass,setflightclass] = useState('Economy')
 
      const handleChange = (e) => {
        settravelOptions(e.target.value)
      }
      
      const [date,setdate] = useState(new Date())
      
      const [singledate,setsingledate] = useState(false)
      
      const handleSearch = () => {
        dispatch({type:'FLIGHT_SEARCH', payload:{flightclass:flightclass,travelOptions:travelOptions,date:date,dates:dates,depart:depart,arrival:arrival,adult:options.adult,child:options.child,infants:options.infants}})
        navigate('/Flightlist',{state:{flightclass,travelOptions,depart,arrival,dates,date,options}})
      }

      const [value,setvalue] = useState('')

      const [filterdes,setfilterdes] = useState([])

      const [destinationmatch,setdestinationmatch] = useState([])
      
      
      useEffect(() => {
        const loaddestination = async () => {
          const res = await axios.get(`/api/products/flight`)
          setfilterdes(res.data)
        }
        loaddestination()
      },[])

      const searchdestination = (text) => {
        setvalue(text)
        setArrival(text)
        if(!text){
          setdestinationmatch([])
        }else{
          
          let matches = filterdes.map(data => data.Depart?.Arrival).filter((des,c) => {
           return des.toLowerCase().includes(value.toLowerCase())
          })
          setdestinationmatch(matches.slice(0,1)) 
        }
      }

    return (
<>         
<div className="Travel">
<div>
    <h5>Book your Flights with ease</h5>
    <p>Discover your next dream destination</p>
    <div className="d-flex justify-content-between w-50">

        <div className="text-center">
        <label>Return</label> <input type="radio" value='return' onChange={handleChange} checked={travelOptions === 'return'}/>
        </div>

        <div className="text-center">
        <label>One Way</label> <input type="radio" value='one-way' onChange={handleChange} checked={travelOptions === 'one-way'}/>
        </div>

    </div>
    <hr></hr>
 <div className="departure">
 <i className="fa-solid fa-plane-departure"></i> <input type="text" onChange={e=>setDepart(e.target.value)} placeholder="Flying From Depart From"/> 
 <i className="fa-solid fa-plane-arrival"></i> <input type="text" value={value} onChange={e=>{searchdestination(e.target.value)}} placeholder="Flying To Destination"/>
 </div>

 {destinationmatch  && <p style={{cursor:'pointer'}} onClick={()=> searchdestination(destinationmatch)}>{destinationmatch}</p>}

 <hr></hr>
 {/* return */}
<div className={travelOptions === 'return' ? 'radio-active text-center' : "text-center radio-content"}>
<span onClick={()=> setOpenDate(!openDate)}><i className="fa-solid fa-calendar-days"></i></span> <span>{`${format(dates[0].startDate, 'MM/dd/yyyy')} to  ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
<br></br>
{openDate && <DateRange editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className="dates" minDate={new Date()}/>} 
</div>

{/* end of return date */}

{/* one way */}
<div className={travelOptions === 'one-way' ? 'radio-active text-center' :"radio-content text-center"}>
<span onClick={()=> setsingledate(!singledate)}><i className="fa-solid fa-calendar-days"></i></span> <span>{`${format(date, 'MM/dd/yyyy')}`}</span>
<br></br>
{singledate && 
  <Calendar date={date} onChange={item => setdate(item)} minDate={new Date()}/>
}
</div>

{/* end of one way return */}

<hr></hr>

<h5>Choose your own Class</h5>
<div className="Class-choice">
  <button className={flightclass === 'Economy' ? "flightclass-tabs" : 'classtabs'} onClick={()=> setflightclass('Economy')}>Economy</button>
  <button className={flightclass === 'Business' ? "flightclass-tabs" : 'classtabs'} onClick={()=>setflightclass('Business')}>Business</button>
</div>

<hr></hr>

<div className=" w-100">

<div className="d-flex justify-content-between">


<div>
<span>Adult</span>
<button disabled={options.adult<=1} onClick={()=> handleOption('adult', 'd')}>-</button>
<span>{options.adult}</span>
<button onClick={()=> handleOption('adult', 'i')}>+</button>
</div>



<div>
<span>Child</span>
<button disabled={options.child<=0} onClick={()=> handleOption('child','d')}>-</button>
<span>{options.child}</span>
<button onClick={()=> handleOption('child', 'i')}>+</button>
</div>

<div>
<span>Infants</span>
<button disabled={options.infants<=0} onClick={()=> handleOption('infants','d')}>-</button>
<span>{options.infants}</span>
<button onClick={()=> handleOption('infants', 'i')}>+</button>
</div>

</div>

<hr></hr>

<div className="text-center">
<button className="border-0 px-2 py-1" onClick={handleSearch}>Search</button>
</div>

</div>

</div>

</div>

{hide && (
<div className="bg-white sticky-info">
  <h5>Destination availabel for search</h5>
  <p>Beijing Intl</p>
  <p>New York JF Kennedy</p>
  <p>Hong Kong Intl</p>
</div>
)}

</>
    
  )
}
