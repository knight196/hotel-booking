import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div  style={{flexWrap:'wrap'}} className="p-2 bg-primary bg-opacity-50 d-flex justify-content-between">

    <ul style={{listStyle:'none'}}>
        <li>Terms & Conditions</li>
        <Link to="/Contact" style={{textDecoration:'none'}} className="text-dark"><li>Contact Us</li></Link>
    </ul>

    <ul style={{listStyle:'none'}}>
        <li>Terms & Conditions</li>
        <Link to="/Contact" style={{textDecoration:'none'}} className="text-dark"><li>Contact Us</li></Link>
    </ul>

    <ul style={{listStyle:'none'}}>
        <li>Terms & Conditions</li>
        <Link to="/Contact" style={{textDecoration:'none'}} className="text-dark"><li>Contact Us</li></Link>
    </ul>

</div>
  )
}
