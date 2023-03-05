import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import {showErrorMsg} from './message'
import {setAuthentication,isAuthenticated} from '../../helpers/auth'
import axios from 'axios'
import {toast} from 'react-toastify'
import './Account.css'
import {useStateValue} from '../../StateProvider'

export default function Login() {

const [{}, dispatch] = useStateValue();

const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			navigate('/admin/dashboard');
			
		} else if (isAuthenticated() && isAuthenticated().role === 0) {
			navigate('/user/dashboard');
		}
	}, [navigate]);

const [formData, setFormData] = useState({
    email:'',
    password:'',
    errorMsg:false
})

const {email,password,errorMsg} = formData;

const handleChange = (e) => {
    e.preventDefault();
    setFormData({
        ...formData,
        [e.target.name] : e.target.value,errorMsg:''
    })
}


const handleSubmit = (e) => {
	e.preventDefault();
	
    if (isEmpty(email) ||isEmpty(password)) {
      setFormData({...formData, errorMsg: 'All fields are required',});
    } 
    else if (!isEmail(email)) {
		setFormData({...formData,errorMsg: 'Invalid email'})
      
	} else{

    const { email, password } = formData;
			const data = { email, password };

			setFormData({ ...formData});

     axios
	  .post("/api/auth/signin", data)
      .then(res => {
        setAuthentication(res.data.token, res.data.user)
   
		if(!res.data.error){
			dispatch({
				type:'SET_USER',
			user:res.data,
			})
			
			toast.success('You have logged in successfully')
		
	
		}
		if(isAuthenticated() && isAuthenticated().role === 1) {
		  console.log('admin dashboard')
		  setTimeout(function(){
			  window.location.href="/"
		  },1500)
		
		}else{
		  console.log('user dashboard')
		  setTimeout(function(){
			  window.location.href="/"
		  }, 1500)
		 
		}
		})
      .catch(err => {
        console.log('signin api function error', err)
        setFormData({...formData,errorMsg: err.response.data.errorMessage})
      })

   

  }

}

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="text-center d-flex flex-column align-items-center justify-content-center h4 vh-100">
    {errorMsg && showErrorMsg(errorMsg)}

    {/* email */}
    <p>Email</p>
    <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email address"/>
{/* password */}

<p>Password</p>
<input type="password" name='password' value={password} placeholder='Enter your password' onChange={handleChange}/>

<br></br>
<button className="my-2" type="submit">Login</button>

<p>Don't have an account <Link to="/signup">Signup</Link></p>

      </form>
    </div>
  )
}
