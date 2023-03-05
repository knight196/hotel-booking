import {useState,useEffect} from 'react'
import './HotelInfo.css'
import { useStateValue } from '../../StateProvider'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'

export default function HotelInfo(props) {
  
  
  const navigate = useNavigate()

  const [slideNumber,setSlideNumber] = useState(0)

  const [open,setOpen] = useState(false)
  
  const [Product,setProduct] = useState([])

const [{user,travel,basket},dispatch] = useStateValue()


useEffect(() => {
  localStorage.setItem('basket', JSON.stringify(basket))
},[basket])


useEffect(() => {
  localStorage.setItem('days', JSON.stringify(travel.days))
  },[travel.days])
  

// const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// function dayDifference(date1,date2){
  //   const timeDiff = Math.abs(date2.getTime() - date1.getTime())
//   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
//   return diffDays
// }

// const days =(dayDifference(dates[0].endDate, dates[0].startDate))


useEffect(() => {
  setProduct(props.detail)
},[props.detail])

const [rooms,setrooms] = useState([])

const getroom = async () => {
const res = await axios.get(`/api/rooms/${props.detail._id}`)
setrooms(res.data)
}

useEffect(() => {
getroom()
},[props.detail])

console.log(rooms)


  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if(direction=== 'l'){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  const [selectedRoom,setSelectedRoom] = useState('')
  
  const handleOnClick = (att,id) => {
  setSelectedRoom(att,id)
  }

  //price options
  const priceOptions = rooms?.filter((p) => selectedRoom && p.title === selectedRoom)
  .map(p => p.price)
  .filter((v,i,a) => a.indexOf(v) === i)

  let minPrice = rooms?.map((p) => p.price)
  .sort((a,b)=> a-b)[0]

  let priceFinal = {}
  if(priceOptions?.length===1){priceFinal = priceOptions[0]}
  else{priceFinal=minPrice}

  //room options
  const roomOptions = rooms?.filter((p) => selectedRoom && p.title === selectedRoom)
  .map(p => p.options)
  .filter((v,i,a) => a.indexOf(v) === i)

  let minOptions = rooms?.map((p)=> p.options)
  .sort((a,b) => a-b)[0]

  let optionsFinal = {}
  if(roomOptions?.length===1){optionsFinal = roomOptions[0]}
  else{optionsFinal = minOptions}


  //room _id 
  const roomId = rooms?.filter(p => selectedRoom && p.title === selectedRoom)
  .map(p=> p._id)
  .filter((v,i,a) => a.indexOf(v) === i)

  let availabelOptions = rooms?.map((p)=> p._id)
  .sort((a,b) => a-b)[0]

  let availabelFinal = {}
  if(roomId?.length===1){availabelFinal = roomId[0]}
  else{availabelFinal = availabelOptions}


  //availabelRoom 
  const availabelRooms = rooms?.filter(p => selectedRoom && p.title === selectedRoom)
  .map(p=> p.availabelRooms)
  .filter((v,i,a) => a.indexOf(v) === i)

  let availableRoomOptions = rooms?.map((p)=> p.availabelRooms)
  .sort((a,b) => a-b)[0]

  let availabelRoomFinal = {}
  if(availabelRooms?.length===1){availabelRoomFinal = availabelRooms[0]}
  else{availabelRoomFinal = availableRoomOptions}

  
  
  const addToBasket = (e) => {
 
      if(!selectedRoom){
        e.preventDefault()
      alert('Please select the room')
}  else{
      dispatch({
        type:'ADD_TO_BASKET',
        payload:{
          title:props.detail.title,
          id:props.detail._id,
          image:props.detail.image,
          location:props.detail.location,
          price:props.detail.Price,
          roomOptions: optionsFinal,
          rooms:selectedRoom,
          availabelRoomId: availabelFinal,
          availabelRooms:availabelRoomFinal,
          roomPrice: priceFinal,
          dates:travel.dates,
          days:travel.days
        }
      })
    navigate('/reserve',)
  }
} 


  return (
    <>

    <div className='sliderContainer'>
    {open && <div className="slider">

    
    <button onClick={()=> setOpen(false)}><i className="fas fa-circle-xmark"></i></button>
    <button className="border-0" onClick={()=> handleMove('l')}><i className="fa fa-chevron-left px-2 py-1"></i></button>
    <div className="sliderWrapper">
      <img src={Product.images[slideNumber]} alt="" className="sliderImg"/>
    </div>
    <button className="border-0" onClick={()=> handleMove('l')}><i className="fa fa-chevron-right px-2 py-1"></i></button>

      </div>}


      <h1>{Product.title}</h1>
  
      <i className="fas fa-location"></i> <span>{Product.location}</span>



      <div className="hotel-images mt-2">
        {Product.images?.map((item,i) => (
          <div className="hotelimgwrapper">
            <img onClick={()=>handleOpen(i)} className="hotelimg" src={item} alt="" />
          </div>
        ))}
      </div>

<div className="d-flex justify-content-between my-3 description" >

  <div className="px-2" style={{width:'1000px'}}>
      <p>{Product.Details}</p>
  </div>

<div className="bg-primary bg-opacity-50 p-2 h-100" style={{width:'600px'}}>
<p>Perfect for a {travel.days} Night stay!</p>
<p>Located in the heart of {Product.country}, this property has excellent location score of <span className="bg-success px-2 text-white">{Product.ratingNo}</span></p>

{/* <h1>£{days * Product.Price} - {days} nights</h1> */}

{rooms?.slice(0,1).map(item => (
  <p>£{travel.days * item.price} - {travel.days} nights</p>
))}

<div>

<Link to={!user ? '/Login' : '/reserve'}>
<button className="w-100 px-2 py-1 border-0 bg-primary bg-opacity-50" onClick={addToBasket}>
  Reserve  or Book Now
  </button>
</Link>

</div>

</div>

</div>

<div className="px-2 mb-5">

<h1>Availability</h1>
{rooms?.map(item => (
      <div className='availabelRooms bg-warning p-2 my-2 rounded-1'>
    <div className="d-flex justify-content-between">
  <p>Title: {item.title}</p>
  <p>Options: {item.options}</p>
  <p>AvailabelRooms: {item.availabelRooms}</p>
  <p>Price: £{item.price}</p>
    </div>

  <div className="text-center">
  <button disabled={item.availabelRooms <=0} className="px-2 py-1 border-0" onClick={()=> handleOnClick(item.title)}>Book Now</button>
  </div>

  <p className={item.availabelRooms ? 'd-none' : "d-flex fully-booked"}>Fully Booked</p>

  </div>
))}


</div>



    </div>
    </>
  )
}
