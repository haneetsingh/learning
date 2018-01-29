export function nodeAdd(state={
  adding: false,
  added: false,
  node: {},
  error: null
}, action) {
  switch (action.type) {
    case "NODE_ADD": {
      return {
        ...state,
        adding: true
      };
    }
    case "NODE_ADD_SUCCESS": {
      return {
        ...state,
        adding: false,
        added: true,
        node: action.payload
      };
    }
    case "NODE_ADD_FAILURE": {
      return {
        ...state,
        adding: false,
        added: false,
        error: action.payload
      };
    }
    default:
      return state
  }
}
