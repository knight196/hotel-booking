import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function UserBooking() {

  const [booking,setbooking] = useState([])

  const getBooking = async () => {
    const res = await axios.get('/api/orders')
    setbooking(res.data.orders)
  }

  useEffect(() => {
    getBooking()
  },[])
  

  return (
    <div>
        {booking.map(order => (
          <>
          {order.products.map(item => (
            <div className="bg-warning bg-opacity-50">
            <Link className="text-dark" style={{textDecoration:'none'}} to={`/api/orders/_id/${order.orderId}`}>
            <div style={{textAlign:'left'}} className="d-flex justify-content-between my-2 p-2">

<div>
<p>Customer's Booking_id: {order.orderId}</p>
<p>Name: {item.title}</p>
<p>Total: £{order.amount}</p>
<p>Location: {item.location}</p>
<p>Customer's Email: {order.email}</p>

</div>
<img style={{width:'100px', height:'100px'}} src={item.image} alt={item.title}/>
</div>
<p className={order.Cancel === false ? 'd-none' : 'd-block text-center h3'}>Cancelled</p>
            </Link>
            <div className="d-flex justify-content-end">

            </div>
            </div>
          ))}
          </>
        ))}
        </div>
  )
}
