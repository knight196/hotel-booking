import {Link} from 'react-router-dom'
import './searchItem.css'
import { useStateValue } from '../../StateProvider'

export default function Searchitem({item}) {

    const [{travel},dispatch] = useStateValue()

    
    return (
        <>

            <div className="searchitem d-flex my-2 p-2 bg-secondary bg-opacity-50 w-100 align-items-center">
           
           <div className="w-50 img-div">
            <img className="w-100" src={item.image} alt={item.title} />
           </div>
            
            <div className="px-2 w-100">

<div className="d-flex justify-content-between">
<p>{item.title}</p>
<div className="d-flex justify-content-between align-items-center">
<p className="mx-2">{item.rating}</p>
<p className="bg-success text-white px-2">{item.ratingNo}</p>
</div>
</div>


            <br></br>

            <div className="d-flex justify-content-between align-items-center">
           <Link to={`/api/products/slug/${item.slug}`}><button className="px-2 border-0 py-1">More Info</button></Link>
            <div className="text-center">
            <p>{travel.days} Night stay!</p>
            <p>£{travel.days * item.Price}</p>
            </div>

            </div>

            </div>
        </div>
      
        </>
    )
}
