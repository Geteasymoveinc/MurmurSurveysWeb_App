
import { NEW_USER,NEW_USER_SECCESSFULL,NEW_USER_FAILED} from "./actionTypes";

const initialState = {
  user: {},  error: null, loading:false
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case NEW_USER:
      state = {
        ...state,
        user: action.payload.user,
        loading: true
      };

      break;
     case NEW_USER_SECCESSFULL:
      state = {
        ...state,
      loading: false
      };
      break;
      case NEW_USER_FAILED:
        state = {
          ...state,
        loading: false,
        error: action.payload
        };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default account;
