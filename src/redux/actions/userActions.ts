import {
  USER_GOOGLE_SIGNIN_REQUEST,
  USER_GOOGLE_SIGNIN_SUCCESS,
  USER_GOOGLE_SIGNIN_ERROR,
  USER_FACEBOOK_SIGNIN_REQUEST,
  USER_FACEBOOK_SIGNIN_SUCCESS,
  USER_FACEBOOK_SIGNIN_ERROR,
  USER_SIGNOUT,
} from "../constants/userConstants";
import { userFacebookLoginRequest, userGoogleLoginRequest } from "../apiHelper/";

export const userGoogleSigninAction = (formData: any) => {
  return async (dispatch:any) => {
    try {
      dispatch({ type: USER_GOOGLE_SIGNIN_REQUEST });
      let data = await userGoogleLoginRequest(formData);
      dispatch({ type: USER_GOOGLE_SIGNIN_SUCCESS, payload: data });
    } catch (e: any) {
      dispatch({ type: USER_GOOGLE_SIGNIN_ERROR, payload: e.message });
    }
  };
};


export const userFacebookSigninAction = (formData: any) => {
  return async (dispatch:any) => {
    try {
      dispatch({ type: USER_FACEBOOK_SIGNIN_REQUEST });
      let data = await userFacebookLoginRequest(formData);
      dispatch({ type: USER_FACEBOOK_SIGNIN_SUCCESS, payload: data });
    } catch (e: any) {
      dispatch({ type: USER_FACEBOOK_SIGNIN_ERROR, payload: e.message });
    }
  };
};

export const userSignOutAction = () => {
  return { type: USER_SIGNOUT };
};
