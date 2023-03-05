import React,{useState,useEffect} from 'react'
import '../dashboard.css'
import {useStateValue} from '../../../StateProvider'
import {logout} from '../../../helpers/auth'
import { useNavigate,Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import Booking from './Booking'
import FlightBooking from './FlightBook'
import MessageTab from './Messagetab'

export default function Userdashboard() {

    const navigate = useNavigate();
  
    const [{user}, dispatch] = useStateValue();
  
    const [toggleState,setToggleState] = useState(1)
    
  const toggleTab = (index) => {
    setToggleState(index)
  }
  
  const signOut = () => {
    logout(() => {
  
      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigate("/");
      toast.success('You have logged out successfully')
    })
  };

  return (
    <div className="container-fluid">

    <div className="tabs-block">
      <div className={toggleState ===1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Profile</div>
      <div className={toggleState ===2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Hotel</div>
      <div className={toggleState ===3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Flight</div>
      <div className={toggleState ===4 ? "active-tabs" : "tabs"} onClick={() => toggleTab(4)}>Message</div>
    </div>

    <div className="content-tabs">

<div className={toggleState === 1 ? "content active-content" : "content"}>
  <div className="mt-5">
  <h5>Profile</h5>
    <span style={{fontSize:'150px'}}><i className="fa-solid fa-user"></i></span>
    <div>
      <p>Username: <span>{user.username}</span></p>      
    </div>
    <button className="border-0 py-1 btn px-2 bg-primary text-white" onClick={signOut}>Sign Out</button>
  </div>
  </div>

<div className={toggleState === 2 ? "content active-content" : "content"}>

<Booking/>

    </div>

<div className={toggleState === 3 ? "content active-content" : "content"}>

<FlightBooking/>


    </div>

<div className={toggleState === 4 ? "content active-content" : "content"}>

<MessageTab/>

    </div>


    </div>

    </div>
  )
}
