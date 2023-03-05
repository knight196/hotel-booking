import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useStateValue} from '../../../StateProvider'

export default function BookingInfo() {

const [{user},dispatch] = useStateValue()

const {id} = useParams()

const [booking,setbooking] = useState([])

const fetchData = async () => {
const res = await axios.get(`/orders/get/_id/${id}`)
setbooking(res.data)
}

useEffect(() => {
fetchData(booking.booking)
},[booking.booking])

console.log(booking)

const [cancelBooking,setCancelBooking] = useState(booking)

console.log(booking)

const cancel = async () => {
  await axios.post('/orders/adminmessage', {
    order_id:booking?.orderId,
    username:user?.username,
    message:'wants to cancel order'
  })
  await axios.post('/orders/addusermessage', {
    order_id:booking?.orderId,
    username:user?.username,
    message:'Your order cancellation request has been received'
  })
  toast.success('Your order cancellation has been received');
  setTimeout(function(){
  window.location.href="/user"
  },1500)
  }

  

  return (
    <div className="my-2">
      <h1>Booking Details</h1>

    <div style={{flexWrap:'wrap'}} className="d-flex justify-content-between px-2">
      <p>Booking-Id: {booking.orderId}</p>
    <p>Time: {booking.createdAt?.slice(11,16)}</p>
    <p>Date: {booking.createdAt?.slice(0,10)}</p>
    <p>Email: {booking.email}</p>
    </div>


    <hr></hr>

    {booking.products?.map((item)=> (
          <div className="d-flex bg-secondary bg-opacity-50 my-1 align-items-center px-2 justify-content-between orders-list">
          <div className="h-50 w-50">
            <img className="w-100 h-100" src={item.image} alt=""/>
          </div>

              <div className="w-100 px-2">
            
            <p>Name: {item.title}</p>
              <p>Location: {item.location}</p>
              <p>Room-Price: £{item.roomPrice}</p>
              <p>Total: £{booking.amount}</p>
              <p>Options: {item.roomOptions}</p>
              <p>Rooms: {item.rooms}</p>
              <p>StartDate: {item.dates[0].startDate.slice(0,10)} - End-Date: {item.dates[0].endDate.slice(0,10)}</p>
              <p>Days: {item.days} - Nights</p>
              <p>Customer's Name: {booking.username}</p>
            </div>

          </div>
     ))}

  <hr></hr>

 
    <div className={booking.Cancel === false ? 'd-none': 'd-block text-center h2'}>
      <p>Cancelled</p>
      <hr></hr>
    </div>
      
        <button className={cancelBooking === booking.orderId === booking.Cancel === true ? 'border-0 w-100 px-2 py-1 bg-warning d-block' : 'd-none'}
        onClick={()=>{cancel(booking.orderId);setCancelBooking(booking.orderId,!cancelBooking)}}>Cancel</button>
      
      
    </div>
  )
}
