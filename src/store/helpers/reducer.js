import { GOOGLE_SIGNUP, GOOGLE_LOGIN, GOOGLE_SUCCESS} from "./actionTypes";
const initialState = {
  email: "",
  fullName: "",
  googleSignupAction: false,
  signupModalStatus: false,
  user: null,
  loading: false
};

const GoogleAuth = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_SIGNUP:
      state = {
        ...state,
        email: action.payload.email,
        fullName: action.payload.name,
        googleSignupAction: true,
        signupModalStatus: true,
      };
      break;
    case GOOGLE_LOGIN:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GOOGLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
      };

      break;
  }
  return state;
};

export default GoogleAuth;
