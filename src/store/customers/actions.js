import {FETCHCUSTOMERS, FETCHCUSTOMERSSUCCESS} from './actionTypes'

const fetchCustomers = (url) => {

    return {
        type: FETCHCUSTOMERS,
        payload: {url}
    }
}


const fetchCustomersSuccess = (customers, length, page) => {
       return {
           type: FETCHCUSTOMERSSUCCESS,
           payload: {customers, length, page}
       }
}


export {fetchCustomers,fetchCustomersSuccess}