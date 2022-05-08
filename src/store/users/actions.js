import {FETCHUSERANALYTICS, FETCHUSERANALYTICSSUCCESS} from './actionTypes'

const fetchUserAnalytics = (url) => {

    return {
        type: FETCHUSERANALYTICS,
        payload: {url}
    }
}


const fetchUserAnalyticsSuccess = (campaigns,surveys,users, partners) => {
       return {
           type: FETCHUSERANALYTICSSUCCESS,
           payload: {campaigns,surveys,users, partners}
       }

}


export {fetchUserAnalytics,fetchUserAnalyticsSuccess}