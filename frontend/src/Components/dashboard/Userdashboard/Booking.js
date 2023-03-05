import {useState,useEffect} from 'react'
import '../dashboard.css'
import axios from 'axios'
import {useStateValue} from '../../../StateProvider'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Booking() {
  
  const [{user},dispatch] = useStateValue()
  

  const [booking,setbooking] = useState([])

  const getBooking = async () => {
    const res = await axios.post('/orders/get', {email:user.email})
    setbooking(res.data)
  }


  useEffect(() => {
    getBooking()
  },[])


  const deletelist = async (id) => {
    await axios.delete(`/orders/get/${id}`)
    toast.success('Your product has been deleted successfully')
    setTimeout(function (){
     window.location.href="/user"
    },1500)
   }

   console.log(booking)


  return (
    <div>
      {booking.map(order => (
        <div className="bg-warning bg-opacity-50">
        {order.products.map(item => (
          <Link style={{textDecoration:'none'}} className="text-dark" to={`/orders/get/_id/${order.orderId}`}>
          <div style={{textAlign:'left'}} className="d-flex justify-content-between my-2 p-2">

            <div>
              <p>Booking_id: {order.orderId}</p>
          <p>Name: {item.title}</p>
          <p>Total: £{order.amount}</p>
          <p>Location: {item.location}</p>
            </div>

          <img style={{width:'100px', height:'100px'}} src={item.image} alt={item.title}/>

          </div>
          <p className={order.Cancel === false ? 'd-none' : 'h3 text-center d-block'}>Cancelled</p>
          </Link>
        ))}
        <div className="d-flex justify-content-end">
        <button onClick={()=> deletelist(order.orderId)}>Delete</button>
          </div>
        </div>
))}
    </div>
  )
}

