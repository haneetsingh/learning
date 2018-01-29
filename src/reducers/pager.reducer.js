export function pager(state = {
  fetching: false,
  fetched: false,
  links: [],
  error: null,
}, action) {
  switch (action.type) {
    case "PAGER_ACTION": {
      return {
        ...state,
        fetching: true
      };
    }
    case "PAGER_ACTION_SUCCESS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        links: action.payload
      };
    }
    case "PAGER_ACTION_FAILURE": {
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
