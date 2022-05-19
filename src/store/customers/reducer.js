


import {FETCHCUSTOMERS, FETCHCUSTOMERSSUCCESS} from './actionTypes'





const initialState = {
    loading:false,
    customers: [],
    length:0,
    page: 1
}


const Customers = (state=initialState, actions) => {

    switch(actions.type){
        case FETCHCUSTOMERS:
            state={
                ...state,
                loading:true
            }
            break;
        case FETCHCUSTOMERSSUCCESS:
            state={
                ...state,
                loading:false,
                customers: actions.payload.customers,
                length: actions.payload.length,
                page: actions.payload.page
            }
            break;

        default:
            state = {...state}
            break;
    }
    return state
}



export default Customers