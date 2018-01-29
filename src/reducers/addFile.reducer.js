export function addFile(state={
  adding: false,
  added: false,
  file: {},
  error: null
}, action) {
  switch (action.type) {
    case "FILE_ADD": {
      return {
        ...state,
        adding: true
      };
    }
    case "FILE_ADD_SUCCESS": {
      return {
        ...state,
        adding: false,
        added: true,
        file: action.payload
      };
    }
    case "FILE_ADD_FAILURE": {
      return {
        ...state,
        adding: false,
        error: action.payload
      };
    }
    default:
      return state
  }
}
