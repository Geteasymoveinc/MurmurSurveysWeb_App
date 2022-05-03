import {FETCHCAMPAIGNS, FETCHCAMPAIGNSSUCCESS} from './actionTypes'

const fetchCampaigns = (url) => {

    return {
        type: FETCHCAMPAIGNS,
        payload: {url}
    }
}


const fetchCampaignsSuccess = (campaigns, requests) => {
       return {
           type: FETCHCAMPAIGNSSUCCESS,
           payload: {campaigns, requests}
       }
}


export {fetchCampaigns,fetchCampaignsSuccess}