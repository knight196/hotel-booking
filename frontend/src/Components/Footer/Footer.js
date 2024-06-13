import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div  style={{flexWrap:'wrap'}} className="p-2 bg-primary w-100 bg-opacity-50 d-flex justify-content-between">

<div className="d-flex">

    <ul style={{listStyle:'none'}}>
      <p>Information</p>
       <li>About us</li>
       <li>Call us</li>
       <li>Privacy policy</li>
       <li>Refund policy</li>
    </ul>

    <ul style={{listStyle:'none'}}>
       <p>Experiences</p>
       <li>Nature</li>
       <li>Culture & heritage</li>
       <li>Adventure</li>
       <li>Spiritual</li>
    </ul>

    <ul style={{listStyle:'none'}}>
       <p>Themes</p>
       <li>Party</li>
       <li>Wedding</li>
       <li>Group tours</li>
    </ul>
</div>

<div>
  <ul style={{listStyle:'none'}}>

<li>Phone:02590908768</li>
<li>Email:info@travely.co.uk</li>
  </ul>

<ul style={{listStyle:'none'}}>
  <p>Address:</p>
  <li>Lion King Road</li>
  <li>Greenwich</li>
  <li>SR5 8LP</li>
  <li>London</li>
</ul>

</div>

</div>
  )
}
