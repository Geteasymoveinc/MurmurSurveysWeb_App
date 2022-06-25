


import {FETCHCAMPAIGNS,FETCHCAMPAIGNSSUCCESS} from './actionTypes'





const initialState = {
    loading:false,
   campaigns: [],
   campaign_adds:[],
   requests: [],
   request_adds: [],
   completed_campaigns: [],
   completed_adds: []
}


const Campaigns = (state=initialState, actions) => {

    switch(actions.type){
        case FETCHCAMPAIGNS:
            state={
                ...state,
                loading:true
            }
            break;
        case FETCHCAMPAIGNSSUCCESS:
            state={
                ...state,
                loading:false,
                campaigns: actions.payload.campaigns,
                campaign_adds: actions.payload.campaign_adds,
                requests: actions.payload.requests,
                request_adds: actions.payload.request_adds,
                completed_campaigns: actions.payload.completed_campaigns,
                completed_adds: actions.payload.completed_adds
            }
            break;

        default:
            state = {...state}
            break;
    }
    return state
}



export default Campaigns