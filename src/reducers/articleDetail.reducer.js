export function articleDetail(state = {
  fetchingArticle: false,
  fetchedArticle: false,
  fetchingAuthor: false,
  fetchedAuthor: false,
  article: [],
  author: [],
  error: null,
}, action) {
  switch (action.type) {
    case "FETCH_ARTICLE_DETAILS": {
      return {
        ...state,
        fetchingArticle: true
      };
    }
    case "FETCH_ARTICLE_DETAILS_FAILURE": {
      return {
        ...state,
        fetchingArticle: false,
        error: action.payload
      };
    }
    case "FETCH_ARTICLE_DETAILS_SUCCESS": {
      return {
        ...state,
        fetchingArticle: false,
        fetchedArticle: true,
        article: action.payload
      };
    }
    case "FETCH_ARTICLE_AUTHOR": {
      return {
        ...state,
        fetchingAuthor: true,
      };
    }
    case "FETCH_ARTICLE_AUTHOR_FAILURE": {
      return {
        ...state,
        fetchingAuthor: false,
        fetchedAuthor: false,
        error: action.payload
      };
    }
    case "FETCH_ARTICLE_AUTHOR_SUCCESS": {
      return {
        ...state,
        fetchingAuthor: false,
        fetchedAuthor: true,
        author: action.payload
      };
    }
    default:
      return state;
  }
}
