import {useEffect,useState} from 'react'
import { useStateValue } from '../../StateProvider'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function ReserveSummary() {

const [{user,basket,travel}, dispatch] = useStateValue()


const navigate = useNavigate()

const removeItem = () => {
  window.localStorage.removeItem('basket')
  window.location.href='/'
}


const orderId = crypto.randomUUID().slice(0,20)


const handlePayment = async (newqty) => {

  const qty = parseInt(newqty) -1 

axios.post('/orders/booking/add', {
  basket:basket,
  availabelRooms:qty,
  availabelRoomId:basket.availabelRoomId,
  amount:travel.days * basket.roomPrice,
  orderId:orderId,
  email:user?.email,
  username:user?.username
})


axios.post('/api/hotelemail', {
  basket:basket,
  availabelRooms:qty,
  availabelRoomId:basket.availabelRoomId,
  amount:travel.days * basket.roomPrice,
  travel:travel.days,
  email:user?.email,
  orderId:orderId
})

await axios.put(`/orders/qtyroom/${basket.availabelRoomId}`, {qty})

toast.success('Reservation successful')

navigate('/')
localStorage.removeItem(basket)
}


  return (



    <>
  <div className="bg-warning p-2 reserve">

      <div className="bg-white p-2 w-100">
        
        <div className="d-flex justify-content-between">

        <div className="d-flex flex-column justify-content-center">
   
      <p>Hotel-Name: {basket.title}</p>
      <p>Location: {basket.location}</p>
      <p>Email: {user.email}</p>

        </div>

    <img style={{width:'200px', height:'150px'}} src={basket.image} alt=""/>

        </div>
      <div className="d-flex justify-content-between">
      <p>Room: {basket.rooms}</p>
      <p>Room-Price: £{basket.roomPrice}</p>
      <p>Options: {basket.roomOptions}</p>
      </div>
      <p>Stay: {travel.days} nights</p>
      <p>£{travel.days * basket.roomPrice }</p>


    <p>Start-Date: {basket.dates[0].startDate.toDateString()} - End-Date: {basket.dates[0].endDate.toDateString()}</p>
  
<hr></hr>
      <div className="text-center">
      <button className="px-2 w-100 py-1 border-0 bg-primary text-white" onClick={removeItem}>Remove</button>
      </div>
      </div>

   
    <div className="text-center">
    <button className="p-2 my-2 w-100 btn border-0 rounded-1 bg-primary text-white" onClick={()=>handlePayment(basket.availabelRooms)}>Confirm Reservation</button>
    </div>
    
    
    </div>
    </>
  )
}
