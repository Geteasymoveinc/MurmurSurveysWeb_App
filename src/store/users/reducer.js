import { FETCHUSERANALYTICS, FETCHUSERANALYTICSSUCCESS } from "./actionTypes";

const initialState = {
  loading: false,
  users: {
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
      categories: [],
    },
    year: {
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
  },
  partners: {
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
      categories: [],
    },
    year: {
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
  },
  ad_customers: {
    time: "week",
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
      categorie: [],
    },
    year: {
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
  },
  ad_partners: {
    time: "week",
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
      categories: [],
    },
    year: {
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
  },
  surveys: {
    surveys: "week",
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
  },
};

const Users = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCHUSERANALYTICS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCHUSERANALYTICSSUCCESS:
      state = {
        ...state,
        loading: false,
        users: {
          ...state.users,
          ...actions.payload.users,
        },
        partners: {
          ...state.partners,
          ...actions.payload.partners,
        },
        surveys: {
          ...state.surveys,
          ...actions.payload.surveys,
        },
        campaigns: {
          ...state.campaigns,
          ...actions.payload.campaigns,
        },
        ad_customers: {
          ...state.ad_customers,
          ...actions.payload.ad_customers,
        },
        ad_partners: {
          ...state.ad_customers,
          ...actions.payload.ad_partners,
        },
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Users;
