const mongoose = require('mongoose')

const flightSchema = mongoose.Schema(
    {
       Depart:{
        flightLogo:{type:String},
        Depart:{type:String},
        DepartTime:{type:String},
        DepartCodename:{type:String},
        Class:{type:String},
        FlightNo:{type:Number},
        Plane:{type:String},
        Transit:{type:String},
        TransitArrival:{type:String},
        TransitCodename:{type:String},
        TransitFlight:{type:String},
        TransitFlightTime:{type:String},
        TransitFlightNo:{type:Number},
        TransitPlane:{type:String},
        Arrival:{type:String},
        ArrivalCodename:{type:String},
        ArrivalTime:{type:String},
        title:{type:String},
        Price:{type:Number}
       },
       Return:{
        flightLogo:{type:String},
        Depart:{type:String},
        DepartCodename:{type:String},
        DepartTime:{type:String},
        Class:{type:String},
        FlightNo:{type:Number},
        Plane:{type:String},
        Transit:{type:String},
        TransitCodename:{type:String},
        TransitArrival:{type:String},
        TransitFlight:{type:String},
        TransitFlightTime:{type:String},
        TransitFlightNo:{type:Number},
        TransitPlane:{type:String},
        Arrival:{type:String},
        ArrivalCodename:{type:String},
        ArrivalTime:{type:String},
        title:{type:String},
        Price:{type:Number},
       }
    }
)

module.exports = mongoose.model('flights', flightSchema)

