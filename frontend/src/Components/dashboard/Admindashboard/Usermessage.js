import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useStateValue} from '../../../StateProvider'

export default function Usermessage() {

  const [{user},dispatch] = useStateValue()
  
  const {id} = useParams();
  const [contactId,setContactId] = useState([])


const [reply,setreply] = useState(false)
const replybtn = () => {
  setreply(!reply)
}

const [replymsg,setreplymsg] = useState('')


const send = async() => {
  await axios.post('/orders/addusermessage', {
    replymsg,
    message_id:contactId?._id,
    username:contactId?.username,
    admin:user?.email,
    to:contactId?.user,
    message:'You have new message from seller',
  })
  .then( ()=> {
    setreplymsg('')
    toast.success('You have sent a new message')
    setTimeout(function(){
     window.location.href="/admin" 
    },1500)
  })
  await axios.post('/orders/adminmessage', {
    replymsg,
    admin:user?.email,
    to:contactId?.user,
    email:contactId?.email,
    username:contactId?.username,
    message_id:contactId?._id,
    message: `You have sent new message`
  })
} 
const fetchData = async () => {
  const res = await axios.get(`/api/usermsg/${id}`)
    setContactId(res.data)
  }

  useEffect(()=> {
fetchData(contactId.contactId)
  },[contactId.contactId])
  return (
    <div className="bg-white p-2">

    {contactId.message_id ?

    (contactId.user_replymsg ? 
<div className="user_replymsg">
<div className="d-flex justify-content-between">
<p>Request-Id: {contactId?._id}</p>
<p>Created-At: {contactId?.createdAt?.slice(0,10)}</p>
</div>

<p>From: {contactId?.user}</p>
<p>Description: {contactId?.user_replymsg}</p>      
<div className={!reply ? 'd-none' : 'd-block'} >
      <hr></hr>
    <textarea className="w-100" value={replymsg} onChange={(e)=> setreplymsg(e.target.value)} style={{height:'100px'}} placeholder="Enter your message here"/>
    <button onClick={send} className={!reply ? 'd-none' : 'px-2 rounded-1 border-0 py-1 d-block bg-primary text-white'}>Send</button>
    </div>
    <button onClick={replybtn} className="rounded-1 my-2 px-2 py-1 bg-primary border-0 text-white">Reply</button>   
</div>

:
<div className="replymsg">
<div className="d-flex justify-content-between ">

  <div>
      <p>Request-Id</p>
      <p>{contactId?._id}</p>
  </div>


<div>
      <p>Created-At</p>
      <p> {contactId?.createdAt?.slice(0,10)}</p>
</div>
  
      </div>
  
      <p>From: {contactId?.admin}</p>
      <p>To: {contactId?.email}</p>
<p>Description: {contactId.replymsg}</p>

</div>
)
:
<div className="user_replymsg">
      <div className="d-flex justify-content-between">
      <p>Request-Id: {contactId?._id}</p>
      <p>Created-At: {contactId?.createdAt?.slice(0,10)}</p>
    </div>
    <p>Email: {contactId?.email}</p>
    <p>Subject: {contactId?.subject}</p>
    <p>Description: {contactId?.description}</p>
    <div className={!reply ? 'd-none' : 'd-block'} >
      <hr></hr>
    <textarea value={replymsg} className="w-100" style={{height:'100px'}} onChange={(e)=> setreplymsg(e.target.value)} placeholder="Enter your message here"/>
    <button onClick={send} className={!reply ? 'd-none' : 'px-2 rounded-1 border-0 py-1 d-block bg-primary text-white'}>Send</button>
    </div>
    <button onClick={replybtn} className="rounded-1 my-2 px-2 py-1 bg-primary border-0 text-white">Reply</button>
    </div> 

 
  
  }
    </div>
  )
}
