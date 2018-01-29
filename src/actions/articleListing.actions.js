import axios from 'axios';
const base_url = 'http://d8-dev.com';
const api_url = '/jsonapi/node/article/';
const page_num = 12;

export const articlesListingActions = {
  fetchArticles
}

function fetchArticles() {
  return function(dispatch) {
    dispatch({type: "FETCH_ARTICLES"});
    const url = base_url+api_url+'?sort[sort-created][path]=created&sort[sort-created][direction]=DESC&page[limit]='+page_num;
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_ARTICLES_SUCCESS", payload: response.data});
      })
      .catch(function(error) {
        dispatch({type: "FETCH_ARTICLES_FAILURE", payload: error.response.data.message});
    });
  }
}
