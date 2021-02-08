import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_WATCHER,
} from '../../constant';

import {
  USERLOGINPASSWORD_CHANGED,
	USERLOGINEMAIL_CHANGED,
	USERTOKEN_CHANGED,
} from '../../action/types';

const initialState = {
  error: null,
  userLoginLoader: false,
  loginData: [],
  userEmail: '',
  userPassword: '',
  userToken: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USERTOKEN_CHANGED:
      return {
        ...state,
        userToken: action.payload
      };
    case USERLOGINEMAIL_CHANGED:
      return {
        ...state,
        userEmail: action.payload
      };
    case USERLOGINPASSWORD_CHANGED:
      return {
        ...state,
        userPassword: action.payload
      };
    case LOGIN_WATCHER:
      return {
        ...state,
        userLoginLoader: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        loginData: action.payload,
        userLoginLoader: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action,
        userLoginLoader: false
      };
    default:
      return state;
  }
};
