import {useState,useEffect} from 'react'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import equals from 'validator/lib/equals'
import { showErrorMsg,showSuccessMsg } from './message'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


export default function SignUp() {
 
 let navigate = useNavigate()


 const [formData, setFormData] = useState({
    username:'',
    password:'',
    password2:'',
    successMsg:false,
    errorMsg:false
 })

 const {
    username,password,email,password2,successMsg,errorMsg
 } = formData
 
const handleChange = evt => {
    setFormData({
        ...formData,
        [evt.target.name]: evt.target.value,
        successMsg:'',
        errorMsg:''
    })
}


const handleSubmit = evt => {
    evt.preventDefault()


    if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
setFormData({
    ...formData,
    errorMsg:'All fields are required'
})
    }else if(!isEmail(email)){
        setFormData({...formData,errorMsg: 'Invalid email'})
    }else if(!equals(password,password2)){
        setFormData({
            ...formData,
            errorMsg:'Passwords do not match'
        })
    }else{
        const {username,email,password} = formData;
        const data = {username,email,password};

        setFormData({...formData})


        axios.post('/api/auth/signup', data)
        .then(response => {
            console.log('Axios signup success:', response)
            setFormData({
                username:'',
                email:'',
                password:'',
                password2:'',

                successMsg:response.data.successMsg
            })

            navigate('/login')
        })
        .catch(err => {
            console.log('Axios signup error:', err)
            setFormData({
                ...formData,
                errorMsg:err.response.data.errorMessage
            })
        })

    }
}

    return (
    <div>

        {successMsg && showSuccessMsg(successMsg)}
        {errorMsg && showErrorMsg(errorMsg)}


        <form onSubmit={handleSubmit} noValidate className="text-center d-flex flex-column align-items-center justify-content-center h4 vh-100">
        {/* username */}
        <p>Username</p>
        <input type="text" placeholder="Username" onChange={handleChange} name="username"  value={username}/>


        {/* email */}

        <p>Email</p>
        <input type="email" name="email" placeholder="Email address" value={email} onChange={handleChange}/>

        {/* password */}
        <p>Password</p>
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>

        {/* password2 */}
        <p>Password2</p>
        <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} value={password2}/>


        <button type="submit">SignUp</button>

        <p>Already have an account? <Link to="/Login">Log In</Link></p>

        </form>

      
    </div>
  )
}
