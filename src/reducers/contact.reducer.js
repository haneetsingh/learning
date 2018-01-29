export function contact(state = {
  sending: false,
  sent: false,
  clearInput: true,
  // hideAlert: false,
  success: null,
  error: null
}, action) {
  switch (action.type) {
    case "CONTACT_REQUEST": {
      return {
        ...state,
        sending: true
      };
    }

    case "CONTACT_REQUEST_SUCCESS": {
      return {
        ...state,
        sent: true,
        sending: false,
        success: action.payload
      };
    }

    case "CONTACT_REQUEST_FAILURE": {
      return {
        ...state,
        sending: false,
        sent: false,
        error: action.payload
      };
    }

    case "CLEAR_FORM": {
      return {
        ...state,
      };
    }

    // case "HIDE_ALERT": {
    //   return {
    //     ...state,
    //     hideAlert: true
    //   }
    // }

    default:
      return state;
  }
}
