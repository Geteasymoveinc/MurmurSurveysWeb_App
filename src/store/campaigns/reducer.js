


import {FETCHCAMPAIGNS,FETCHCAMPAIGNSSUCCESS} from './actionTypes'





const initialState = {
    loading:false,
   campaigns: [],
   requests: [],
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
                campaigns: [
                    ...state.campaigns,
                    ...actions.payload.campaigns,
                ],
                requests: [
                  ...state.requests,
                  ...actions.payload.requests,
                ]
            }
            break;

        default:
            state = {...state}
            break;
    }
    return state
}



export default Campaigns