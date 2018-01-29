export function getUser(state = {
  fetching: false,
  fetched: false,
  userData: {},
  error: null,
}, action) {
  switch (action.type) {
    case "FETCH_USER": {
      return {
        ...state,
        fetching: true
      };
    }
    case "FETCH_USER_SUCCESS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        userData: action.payload
      };
    }
    case "FETCH_USER_FAILURE": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
