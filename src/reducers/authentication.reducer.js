// import { userConstants } from '../constants/user.constants';

export function authentication(state = {
  loggingIn: false,
  loggedIn: false,
  loggingOut: false,
  loggedOut: false,
  user: {},
  error: null,
}, action) {

  switch (action.type) {
    case "LOGIN_REQUEST": {
      return {
        ...state,
        loggingIn: true
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.payload,
        error: null
      };
    }
    case "LOGIN_FAILURE": {
      return {
        ...state,
        loggingIn: false,
        error: action.payload
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        loggedIn: false
      }
    }
/*    case "LOGOUT_REQUEST": {
      return {
        ...state,
        loggeingOut: true
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        loggeingOut: false,
        loggedOut: true
      };
    }
    case "LOGOUT_FAILURE": {
      return {
        ...state,
        loggeingOut: false,
        error: action.payload
      };
    }*/
    default:
      return state;
  }
}
