import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Adminmessage() {



const [usermsg,setusermsg] = useState([])

const getusermsg = async () => {
const res = await axios.get('/api/adminmessage')
setusermsg(res.data.adminmsg)
}


const deletemsg= async (id) => {
   await axios.delete(`/api/adminmessage/${id}`)
  toast.success('You message has been deleted')
  setTimeout(function (){
    window.location.href="/admin"
   },1500)
}

  useEffect(()=> {
    getusermsg();
  },[])

  return (
    <div className="text-center">
      {usermsg.map((item)=> (
        <div key={item._id} className="d-flex my-1 py-1 justify-content-between align-items-center bg-white bg-opacity-50 p-2">
      {!item.order_id ? (
          <Link className="text-dark" style={{textDecoration:'none'}} to={`/api/usermsg/${item._id}`}>
        <p>{item.username} : {item.message}</p>
          </Link>
      ) : (item.order_id !== item.flight_id?
        <Link className="text-dark" style={{textDecoration:'none'}} to={`/api/orders/_id/${item.order_id}`}>
        <p>{item.username} : {item.message}</p>
        </Link> :
        <Link className="text-dark" style={{textDecoration:'none'}} to={`/api/flightid/${item.flight_id}`}>
        <p>{item.username} : {item.message}</p>
        </Link>
      )
    
    }
          <button className="bg-danger btn" onClick={()=> deletemsg(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}