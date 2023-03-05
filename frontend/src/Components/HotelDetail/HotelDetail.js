import {useState,useEffect} from 'react'
import HotelInfo from '../Hotelinfo/HotelInfo'
import axios from 'axios'
import {useParams} from 'react-router-dom'

export default function HotelDetail() {
  
  const {slug} = useParams();

  const [details,setDetails] = useState([])

  const fetchData = async () => {
    const res = await axios.get(`/api/products/slug/${slug}`)
    setDetails(res.data)
  }


  useEffect(() => {
    fetchData()
  },[slug])
  
  return (
    <div>
      <HotelInfo detail={details}/>
     
    </div>
  )
}
