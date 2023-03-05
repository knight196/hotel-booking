import {useState,useEffect} from 'react'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Home.css'
import {useNavigate,Link} from 'react-router-dom'
import {format} from 'date-fns'
import { useStateValue } from '../../StateProvider';
import Footer from '../Footer/Footer'
import Travel from './Travel/Travel'

export default function Home() {

  const [{travel},dispatch] = useStateValue();

  const [destination,setdestination] = useState('')
  const [openDate,setOpenDate] = useState(false)


  const [dates,setDates] = useState(
    [
      {
      startDate:new Date(),
      endDate:new Date(),
      key:'selection'

}]
    );
    

    // const [options,setOptions] = useState({
    //   room:1
    // })
  

    // const handleOption = (name,operation) => {
    //   setOptions(prev=> {return {
    //     ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] -1,
    //   }})
    // }

    const navigate = useNavigate()

    const handleSearch = () => {

      const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

      function dayDifference(date1,date2){
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDays
      }
      
      const days =(dayDifference(dates[0].endDate, dates[0].startDate))
      
      dispatch({type:'NEW_SEARCH', payload:{destination:destination,days:days,dates:dates}})
      navigate('/List',{state:{destination,dates,days}})
    }
      
       
    useEffect(() => {
      localStorage.setItem('travel', JSON.stringify(travel))
    },[travel])

    const [toggleState,settoggleState] = useState(1)

    const [hide,sethide] = useState(false)

    const toggleTab = (index) => {
      settoggleState(index)
      sethide(true)

      setTimeout(() => {
          sethide(false)
      },5000)

    }


    
  
  return (
    <>
    <div className="d-flex">
      <button onClick={()=> toggleTab(1)} className={toggleState ===1 ? "active-tab": "tab"}>Hotel</button>
      <button onClick={()=> toggleTab(2)} className={toggleState === 2 ? "active-tab": "tab"}>Flights</button>
    </div>

    <div className={toggleState === 1 ? "active-contents " : "contents"}>

<div className="Homepage">


    <div>
     <div>
     <i className="fa-solid fa-bed"></i> <input type="text" onChange={e=>setdestination(e.target.value)} placeholder="where are you going"/>
     </div>

     <hr></hr>
<div className="text-center">
<span onClick={()=> setOpenDate(!openDate)}><i className="fa-solid fa-calendar-days"></i></span> <span>{`${format(dates[0].startDate, 'MM/dd/yyyy')} to  ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
<br></br>
{openDate && <DateRange editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className="dates" minDate={new Date()}/>} 
</div>

<hr></hr>

<div className=" w-100">

  {/* <div className="text-center">
<i className="fa-solid fa-user"></i> <span>Rooms</span>
  <button disabled={options.adult<=1} onClick={()=> handleOption('room', 'd')}>-</button>
  <span>{options.room}</span>
  <button onClick={()=> handleOption('room', 'i')}>+</button>
  </div> */}

<div className="d-flex justify-content-center">

{/* <div>
  <p>Adults</p>
<button disabled={options.adult<=1} onClick={()=> handleOption('adult','d')}>-</button>
<span>{options.adult}</span>
<button onClick={()=> handleOption('adult', 'i')}>+</button>
</div> */}

{/* <div>
  <p>Rooms</p>
</div> */}


</div>
{/* 
<hr></hr> */}
<div className="text-center">
  <button className="border-0 px-2 py-1" onClick={handleSearch}>Search</button>
</div>

</div>

    </div>


</div>

{hide && (

  <div className="sticky-info">
          <h5>Destination availabel for search</h5>
          <p>China</p>
          <p>United Kingdom</p>
          <p>USA</p>
        </div>
    
    )}   

</div>


     <div className={toggleState ===2 ? 'active-contents' : 'contents'}>
    <Travel hide={hide}/>
    
     </div>

    <Footer/>
    </>
  )
}
