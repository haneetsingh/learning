export function editArticle(state = {
  editing: false,
  edited: false,
  error: null,
  article: []
}, action) {
  switch (action.type) {
    case "EDIT_ARTICLE": {
      return {
        ...state,
        editing: true
      };
    }
    case "EDIT_ARTICLE_SUCCESS": {
      return {
        ...state,
        editing: false,
        edited: true,
        article: action.payload
      };
    }
    case "EDIT_ARTICLE_FAILURE": {
      return {
        ...state,
        editing: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
