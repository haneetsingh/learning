export function articleImage(state = {
  fetchingImage: false,
  fetchedImage: false,
  image: [],
  error: null
}, action) {
  switch (action.type) {
    case "FETCH_ARTICLE_IMAGE": {
      return {
        ...state,
        fetchingImage: true,
      };
    }
    case "FETCH_ARTICLE_IMAGE_FAILURE": {
      return {
        ...state,
        fetchingImage: false,
        error: action.payload
      };
    }
    case "FETCH_ARTICLE_IMAGE_SUCCESS": {
      return {
        ...state,
        fetchingImage: false,
        fetchedImage: true,
        image: action.payload
      };
    }
    default:
      return state;
  }
}
