import {FETCHUSERANALYTICS, FETCHUSERANALYTICSSUCCESS} from './actionTypes'

const fetchUserAnalytics = (url) => {

    return {
        type: FETCHUSERANALYTICS,
        payload: {url}
    }
}


const fetchUserAnalyticsSuccess = (campaigns,surveys,users, partners, ad_customers, ad_partners) => {
       return {
           type: FETCHUSERANALYTICSSUCCESS,
           payload: {campaigns,surveys,users, partners, ad_customers, ad_partners}
       }

}


export {fetchUserAnalytics,fetchUserAnalyticsSuccess}