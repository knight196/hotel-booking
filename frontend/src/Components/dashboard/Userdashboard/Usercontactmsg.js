import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useStateValue} from '../../../StateProvider'

export default function Usercontactmsg() {

  const [{user},dispatch] = useStateValue()
  
  const {id} = useParams();
  const [contactId,setContactId] = useState([])


  const [reply,setreply] = useState([])

  const [user_replymsg,setuser_replymsg] = useState('')

  const replybtn = () => setreply(!reply)
  
  
  const send = async () => {
    await axios.post('/orders/addusermessage',{
      user_replymsg,
      user:user?.email,
      to:contactId?.admin,
      username:contactId?.username,
      message:'You have sent a message to seller',
      message_id:contactId?.message_id,
    })
    .then(()=> {
      setuser_replymsg('')
      toast.success('You have replied the message')
      setTimeout(function(){
        window.location.href="/user"
      },1500)
    })
    await axios.post('/orders/adminmessage',{
      user_replymsg,
      user:user?.email,
      to:contactId?.admin,
      message_id:contactId?.message_id,
      username:contactId?.username,
      email:user?.email,
      message: 'You have recieved a message from buyer'
    })
  }

  const fetchData = async () => {
    const res = await axios.get(`/orders/addcontactmsg/_id/${id}`)
    setContactId(res.data)
  }

  useEffect(()=> {
fetchData(contactId.contactId)
  },[contactId.contactId])


  return (
    <div className="bg-white p-2">
    
    {contactId.message_id ?

(contactId.replymsg ? 
  
<div className="user_replymsg">
<div className="d-flex justify-content-between">
      <p>Request-Id: {contactId?._id}</p>
      <p>Created-At: {contactId?.createdAt?.slice(0,10)}</p>
      </div>

<p>From: {contactId?.admin}</p>
      <p>Description: {contactId?.replymsg}</p>      

<div className={!reply ? 'd-block' : 'd-none'} >
  <hr></hr>
<textarea className="w-100" style={{height:'100px'}} onChange={(e)=> setuser_replymsg(e.target.value)} value={user_replymsg} placeholder="Enter your message"/>
<br></br>
<button onClick={send} className="px-2 py-1 text-white bg-primary rounded-1 border-0">Send</button>
</div>

<button onClick={replybtn} className="px-2 my-2 py-1 bg-primary text-white border-0 rounded-1">Reply</button>

</div>

:

<div className="user_replymsg">
<div className="d-flex justify-content-between">

  <div>
      <p>Request-Id</p>
      <p>{contactId?._id}</p>
  </div>

  <div>


      <p>Created-At</p>
      <p>{contactId?.createdAt?.slice(0,10)}</p>

  </div>

      </div>
      <p>From: {contactId?.user}</p>
      <p>To: {contactId?.to}</p>
<p>Description: {contactId.user_replymsg}</p>
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
        
        </div>
        
      }
      </div>
  )
}
