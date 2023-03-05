export const initialState = {
    basket:JSON.parse(localStorage.getItem('basket') || '[]'),
    user:JSON.parse(localStorage.getItem('user')) || null,
    // destination:JSON.parse(localStorage.getItem('destination')) || null,
    // days:JSON.parse(localStorage.getItem('days') || '[]'),
    // dates:JSON.parse(localStorage.getItem('dates') || '[]'),
    travel:JSON.parse(localStorage.getItem('travel') || '[]'),
    flight:JSON.parse(localStorage.getItem('flight') || '[]'),
    flightBook:JSON.parse(localStorage.getItem('flightBook') || '[]'),
    flighttotal:[]
}


const reducer = (state,action) => {

switch(action.type){
   
    case 'NEW_SEARCH':
        return {
            ...state,travel:action.payload
        }

        case 'FLIGHT_SEARCH':
            return{
                ...state,flight:action.payload
            }
    
    case 'ADD_TO_BASKET':
        return  {
            ...state,basket:action.payload
        }

        case 'FLIGHT_DATA':
            return{
                ...state,flightBook:[action.payload]
            }

            case 'FLIGHT_TOTAL':
                return{
                    ...state,flighttotal:action.payload
                }


                    case 'SET_USER':
                        return{...state,user:action.payload}

                default:
                    return state


}
}

export default reducer