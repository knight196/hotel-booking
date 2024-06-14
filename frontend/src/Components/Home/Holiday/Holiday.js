import {useState,useEffect,useRef} from 'react'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../Home.css'
import {useNavigate,Link} from 'react-router-dom'
import {format} from 'date-fns'
import { useStateValue } from '../../../StateProvider';
import slideshow from './data'
import flightdata from './flight'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


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
  
      //slideshow
  const [current,setCurrent] = useState(0)
  const [slide] = useState(slideshow)
  
  const length = slide.length
  
  const timeout = useRef(null)
  
  useEffect(() => {
  
  const nextSlide = () => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1))
  }
  
  timeout.current = setTimeout(nextSlide, 4000)
  
  //clear timeout and reset its set time
  
  return function (){
    if(timeout.current){
      clearTimeout(timeout.current)
    }
  }
  
  },[current,length])
  
  const nextSlide = () => {
    if(timeout.current) {
      clearTimeout(timeout.current)
    }
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  
  const prevSlide = () => {
    if(timeout.current){
      clearTimeout(timeout.current)
    }
    setCurrent(current === 0 ? length - 1 : current -1)
  }
   
  //array of the slide
  if(!Array.isArray(slide) || slide.length <= 0){
    return null
  }
  return (
    <>
      <div className="carousel">
<button className="left-arrow" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
<button className="right-arrow" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
{slideshow.map((slide,index) => (
  <>
  {index === current && (
    <div className="slideshow-flex">
    <img src={slide.image} alt={slide.title}/>
    <div className="detail">
    <h4 className="text-white">{slide.title}</h4>
    <p className="text-white">Price starts from : £{slide.price}</p>
    </div>
    </div>
  )}
  </>
))}
</div>

<div className="Homepage bg-primary bg-opacity-50">
    <div>
     <div>
     <i className="fa-solid fa-bed"></i> <input type="text" onChange={e=>setdestination(e.target.value)} placeholder="where are you going"/>
     </div>
    
<div className="text-center">
<span onClick={()=> setOpenDate(!openDate)}><i className="fa-solid fa-calendar-days"></i></span> <span>{`${format(dates[0].startDate, 'MM/dd/yyyy')} to  ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
<br></br>
{openDate && <DateRange editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className="dates" minDate={new Date()}/>} 
</div>


<div className="text-center">
  <button className="border-0 px-2 py-1" onClick={handleSearch}>Search</button>

</div>

    </div>

</div>

<div className="my-1">

    <h4 className="text-center">Popular Holiday Destination</h4>

<div className="destination">
{slideshow.map(item => (
  <div className="destination-card">
    <img src={item.image} alt={item.title}/>
    <p className="p-2">{item.title}</p>
    <p className="p-2">{item.detail}</p>
  </div>
))}
</div>

</div>

<div className="my-1">

<h4 className="text-center">Why we are different</h4>

<div className="experiences">

<div className="card p-2">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
  <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
</svg>
<h5>Tailor-Made Packages</h5>
<p>
  When it comes to delivering the best planned holiday package to you, we strive to exceed
  your expectations. For us, it has to be spot on. We do what we do in the ideal way possible.
</p>
</div>

<div className="card p-2">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>
<h5>Best Experience</h5>
<p>At Travely, we choose to put forth an essence of our own expertise and finished experiences into 
  our services and method of planning.
</p>
</div>

<div className="card p-2">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
  <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
</svg>
<h5>Exquisite Service</h5>
<p>From the moment you make the first call to enquire, our service are geared up. From the 
  time booking to your stay and well after the trip as well, we will guide you and be at your back.
</p>
</div>

</div>
</div>

<div>

  <h4 className="text-center">Get amazing airfare deals on flight bookings</h4>

  <Swiper
      // install Swiper modules
      modules={[Navigation]}
      spaceBetween={30}
      slidesPerView={2}
      navigation
      className="p-2"
      loop={true}
      breakpoints={{
      200:{
          slidesPerview:2
        },
        720:{
          slidesPerView:3
        },
        1020:{
          slidesPerView:4
        }
      }}
>
  
    {flightdata.map(item => (
      <>
        <SwiperSlide className="flight-card">
          <img src={item.image} alt={item.title}/>
          <div className="p-2">
          <p>{item.title}</p>
          <p className="text-danger">from: £{item.price}</p>
          <button className="btn btn-primary w-100">View Deal</button>
          </div>
        </SwiperSlide>
      </>
    ))}
  
    </Swiper>


</div>

<div>
</div>

    </>
  )
}
