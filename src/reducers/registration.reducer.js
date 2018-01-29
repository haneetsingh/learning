export function registration(state = {
  registering: false,
  registered: false,
  data: {},
  error: null
}, action) {
  switch (action.type) {
    case "USER_REGISTER": {
      return {
        ...state,
        registering: true,
        error: null
      };
    }
    case "USER_REGISTER_SUCCESS": {
      return {
        ...state,
        registered: true,
        data: action.payload,
        error: null
      };
    }
    case "USER_REGISTER_FAILURE":{
      return {
        ...state,
        registering: false,
        registered: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
