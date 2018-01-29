export function articleList(state = {
  fetching: false,
  fetched: false,
  list: [],
  error: null,
}, action) {
  switch (action.type) {
    case "FETCH_ARTICLES": {
      return {
        ...state,
        fetching: true
      };
    }
    case "FETCH_ARTICLES_FAILURE": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case "FETCH_ARTICLES_SUCCESS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.payload
      };
    }
    default:
      return state;
  }
}
