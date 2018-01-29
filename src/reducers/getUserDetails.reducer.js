export function getUserDetails(state = {
  fetchingDetails: false,
  fetchedDetails: false,
  userDetails: {},
  error: null,
}, action) {
  switch (action.type) {
    case "FETCH_USER_DETAILS": {
      return {
        ...state,
        fetchingDetails: true
      };
    }
    case "FETCH_USER_DETAILS_SUCCESS": {
      return {
        ...state,
        fetchingDetails: false,
        fetchedDetails: true,
        userDetails: action.payload
      };
    }
    case "FETCH_USER_DETAILS_FAILURE": {
      return {
        ...state,
        fetchingDetails: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
