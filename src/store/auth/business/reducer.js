import {

  ADD__PACKAGE,
  SEND_PACKAGE_SECCESSFULL,
  SEND_PACKAGE_ERROR,
  ERROR_CLEAN
} from "./actionTypes";



const initialState = {
    registrationError: null, user: null, loading: false, option:null,error:null
}

const business = (state = initialState, action) => {
    switch (action.type) {
        case ADD__PACKAGE:
           return {...state, loading:true, option:action.payload.option}
      
        case SEND_PACKAGE_SECCESSFULL:
            return {...state, loading:false, user:action.payload,error:false};

        case SEND_PACKAGE_ERROR:
            return {...state, loading:false, error:action.payload};

        case ERROR_CLEAN:
            return {...state, error:false}
        
        default:
            return state;
    }
}



export default business;
