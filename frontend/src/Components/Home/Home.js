import {useState} from 'react'
import Holiday from './Holiday/Holiday'
import Travel from './Travel/Travel'
import Footer from '../Footer/Footer'

export default function Home() {

    const [toggleState,settoggleState] = useState(1)

    const [hide,sethide] = useState(false)

    const toggleTab = (index) => {
      settoggleState(index)
      sethide(true)

      setTimeout(() => {
          sethide(false)
      },5000)

    }

  return (
    <>
    <div className="d-flex">
      <button onClick={()=> toggleTab(1)} className={toggleState ===1 ? "active-tab": "tab"}>Hotel</button>
      <button onClick={()=> toggleTab(2)} className={toggleState === 2 ? "active-tab": "tab"}>Flights</button>
    </div>

    <div className={toggleState === 1 ? "active-contents " : "contents"}>

<Holiday/>

{hide && (

  <div className="sticky-info">
          <h5>Destination availabel for search</h5>
          <p>China</p>
          <p>United Kingdom</p>
          <p>USA</p>
        </div>
    
    )}   

</div>


     <div className={toggleState ===2 ? 'active-contents' : 'contents'}>
    <Travel hide={hide}/>
    
     </div>

    <Footer/>
    </>
  )
}
