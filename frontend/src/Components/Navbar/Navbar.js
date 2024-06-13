import React,{useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import {isAuthenticated,logout} from '../../helpers/auth'
import {toast} from 'react-toastify'

export default function Navbar() {


const [{basket,user},dispatch] = useStateValue();
const navigate = useNavigate();

const signOut = () => {
  logout(() => {
    dispatch({
      type:'SET_USER',
      user:null,
    })
    navigate('/')
    toast.success('you have logged out successfully')
  })
}


  return (
    <div className="bg-primary p-2 bg-opacity-50">
    <div className="d-flex justify-content-between align-items-center">
      <Link to="/" className="text-dark" style={{textDecoration:'none'}}><h1>Travely</h1></Link>
     
     <div>
      <div>
      {!isAuthenticated() ? (
            <Link to="/Login" className="text-dark">
            <h5>Sign In</h5>
            </Link>
):
           ( 
            <div className="d-flex flex-column">
            <small className="text-white">{user?.username}</small>
           <small className="text-white" onClick={signOut}>Sign Out</small>
            </div> 
           )        
}
      </div>

<div>
{isAuthenticated() && isAuthenticated().role === 0 && (
        <p>
       <Link to="/user">Dashboard</Link>
    </p>
  )}
  {isAuthenticated() && isAuthenticated().role === 1 && (
    <p>
       <Link to="/admin">Dashboard</Link>
    
       </p>
  )}
</div>

    </div>

    </div>

    </div>
  )
}
