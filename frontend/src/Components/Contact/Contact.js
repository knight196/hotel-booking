import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'


export default function Contact() {


    const [username,setusername] = useState('')
    const [email,setemail] = useState('')
    const [subject,setsubject] = useState('')
    const [description,setdescription] = useState('')


    const submit = async (e) => {
        e.preventDefault()

        await axios.post('/orders/adminmessage', {
        username,email,subject,description,
        message:'You have new message from buyer'
        })

        await axios.post('/orders/addusermessage', {
            username,email,subject,description,
            message:'You have sent a new message to seller'
        })
        .then(()=> {
            setusername('')
            setemail('')
            setsubject('')
            setdescription('')
            setTimeout(function(){
                toast.success('Your message has been sent');
                setTimeout(function(){
                window.location.href="/"
                },1500)
            })
        })
        .catch((err)=> alert(err))
    }

  return (
    <div className="text-center">
      <hr></hr>
      <h1>Contact Form</h1>

<div>
    <h5>Username</h5>
    <input type="text" value={username} onChange={(e)=>setusername(e.target.value)}/>
</div>

<div>
    <h5>Email</h5>
    <input type="email" value={email} onChange={(e)=> setemail(e.target.value)}/>
</div>

<div>
    <h5>Subject</h5>
    <input type="text" value={subject} onChange={(e)=> setsubject(e.target.value)}/>
</div>

<div>
    <h5>Description</h5>
    <textarea className="w-50" style={{height:'150px'}} type="text" value={description} onChange={(e)=> setdescription(e.target.value)}/>
</div>

<button onClick={submit} className="px-2 py-1 border-0 rounded-1 bg-primary text-white">Submit</button>
    </div>
  )
}