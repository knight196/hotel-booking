
import {Routes,Route} from 'react-router-dom'
import Home from '../Components/Home/Home'
import List from '../Components/Lists/Lists'
import FlightList from '../Components/Lists/Travellist/Travellist'
import Login from '../Components/Account/Login'
import SignUp from '../Components/Account/SignUp'
import HotelDetail from '../Components/HotelDetail/HotelDetail'
import ReserveSummary from '../Components/ReserveSummary/ReserveSummary'
import Userdashboard from '../Components/dashboard/Userdashboard/Userdashboard'
import UserContactmsg from '../Components/dashboard/Userdashboard/Usercontactmsg'
import UserBookingInfo from '../Components/dashboard/Userdashboard/BookingInfo'

import FlightBookingInfo from '../Components/dashboard/Userdashboard/FlightBookinfo'

import Admindashboard from '../Components/dashboard/Admindashboard/Admindashboard'
import AdminBookingInfo from '../Components/dashboard/Admindashboard/UserBookingInfo'

import UserFlightBookingInfo from '../Components/dashboard/Admindashboard/FightBookingInfo'

import Usermsg from '../Components/dashboard/Admindashboard/Usermessage'

import Contact from '../Components/Contact/Contact'

import TravelInfo from '../Components/Lists/Travellist/TraveInfo'

import Payment from '../Components/Lists/Travellist/Payment'

import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

export default function RouteChange() {
 
  const stripePromise = loadStripe('pk_test_51MNEWyA7EeqkrrQutdFOIkEgpXevwvsieDKBW7CY5VsK492iipZr7sflMaPzytCoakMKuwWG8exiHDD31wFWDqyX00BnDVWsI0')


  return (
    <div>


  
      
<Routes>

<Route path="/" element={<Home/>}></Route>
<Route path="/List" element={<List/>}></Route>
<Route path="/Flightlist" element={<FlightList/>}></Route>
<Route path="/api/products/slug/:slug" element={<HotelDetail/>}/>
<Route path="/api/products/flight/:id" element={<TravelInfo/>}/>
<Route path="/api/flightid/:id" element={<UserFlightBookingInfo/>}/>
<Route path="/reserve" element={<ReserveSummary/>}/>
<Route path="/Login" element={<Login/>}/>
<Route path="/SignUp" element={<SignUp/>}/>
<Route path="/user" element={<Userdashboard/>}/>
<Route path="/admin" element={<Admindashboard/>}/>

<Route path="/orders/get/_id/:id" element={<UserBookingInfo/>}/>
<Route path="/orders/flightid/:id" element={<FlightBookingInfo/>}/>
<Route path='/orders/addcontactmsg/_id/:id' element={<UserContactmsg/>}/>
<Route path='/api/orders/_id/:id' element={<AdminBookingInfo/>}/>

<Route path="/Contact" element={<Contact/>}/>

<Route path="/api/usermsg/:id" element={<Usermsg/>}/>

<Route path="/payment" element={<Elements stripe={stripePromise}><Payment/></Elements>}/>

</Routes>


    </div>
  )
}
