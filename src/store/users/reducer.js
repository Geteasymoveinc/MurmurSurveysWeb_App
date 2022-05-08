


import {FETCHUSERANALYTICS,FETCHUSERANALYTICSSUCCESS} from './actionTypes'





const initialState = {
    loading:false,
   users:{
    users: "week",
    chart: "week",
    week: {
        total: 0,
        active: 0,
        improvement: 0,
        series: [],
        categories: ["Mon", " Tue", "Wed", "Thu", "Fri", "Sat", " Sun"],
      },
      month: {
        total: 0,
        active: 0,
        improvement: 0,
        series: [],
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      year: {
        total: 0,
        active: 0,
        improvement: 0,
        series: [],
        categories: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
        ],
      },
    },
    partners:{
      partners: "week",
      week: {
          total: 0,
          improvement: 0,
          series: [],
          categories: ["Mon", " Tue", "Wed", "Thu", "Fri", "Sat", " Sun"],
        },
        month: {
          total: 0,
          improvement: 0,
          series: [],
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        year: {
          total: 0,
          improvement: 0,
          series: [],
          categories: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
          ],
        },
    },
    surveys: {
        surveys: "week",
        week: {
          total: 0,
          improvement: 0,
          series:[],
        },
        month: {
          total: 0,
          improvement: 0,
          series: [],
        },
        year: {
          total: 0,
          improvement: 0,
          series: [],
        }
      },
    campaigns: {
        campaigns: "week",
        week: {
          total: 0,
          improvement: 0,
          series: [],
        },
        month: {
          total: 0,
          improvement: 0,
          series: [],
        },
        year: {
          total: 0,
          improvement: 0,
          series: [],
        },
    }
}


const Users = (state=initialState, actions) => {

    switch(actions.type){
        case FETCHUSERANALYTICS:
            state={
                ...state,
                loading:true
            }
            break;
        case FETCHUSERANALYTICSSUCCESS:
            state={
                ...state,
                loading:false,
                users: {
                ...state.users,
                 ...actions.payload.users
                },
                partners: {
                  ...state.partners,
                  ...actions.payload.partners
                },
                surveys: {
                    ...state.surveys,
                    ...actions.payload.surveys,

                },
                campaigns: {
                    ...state.campaigns,
                    ...actions.payload.campaigns,
                }
            }
            break;

        default:
            state = {...state}
            break;
    }
    return state
}



export default Users