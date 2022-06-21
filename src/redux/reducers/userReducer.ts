import {
  USER_GOOGLE_SIGNIN_REQUEST,
  USER_GOOGLE_SIGNIN_SUCCESS,
  USER_GOOGLE_SIGNIN_ERROR,
  USER_FACEBOOK_SIGNIN_REQUEST,
  USER_FACEBOOK_SIGNIN_SUCCESS,
  USER_FACEBOOK_SIGNIN_ERROR,
  USER_SIGNOUT
} from "../constants/userConstants";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_GOOGLE_SIGNIN_REQUEST:
      return { ...state, isLoading: true, data: [], error: null };
    case USER_GOOGLE_SIGNIN_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case USER_GOOGLE_SIGNIN_ERROR:
      return { ...state, isLoading: false, data: [], error: action.payload };
    
    case USER_FACEBOOK_SIGNIN_REQUEST:
      return { ...state, isLoading: true, data: [], error: null };
    case USER_FACEBOOK_SIGNIN_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case USER_FACEBOOK_SIGNIN_ERROR:
      return { ...state, isLoading: false, data: [], error: action.payload };

    case USER_SIGNOUT:
      return initialState;
      
    default:
      return state;
  }
};


