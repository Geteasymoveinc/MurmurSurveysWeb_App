import {FETCHUSERANALYTICS, FETCHUSERANALYTICSSUCCESS} from './actionTypes'

const fetchUserAnalytics = (url) => {

    return {
        type: FETCHUSERANALYTICS,
        payload: {url}
    }
}


const fetchUserAnalyticsSuccess = (campaigns,surveys,users) => {
       return {
           type: FETCHUSERANALYTICSSUCCESS,
           payload: {campaigns,surveys,users}
       }

}


export {fetchUserAnalytics,fetchUserAnalyticsSuccess}