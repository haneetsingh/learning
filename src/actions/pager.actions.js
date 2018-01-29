import axios from 'axios';

export const pagerActions = {
  fetchPageItems
}

function fetchPageItems(url) {
  return function(dispatch) {
    dispatch({type: "PAGER_ACTION"})
    axios.get(url)
      .then((response) => {
        dispatch({type: "PAGER_ACTION_SUCCESS", payload: response.data});
        dispatch({type: "FETCH_ARTICLES"});
        axios.get(url)
          .then((response) => {
            dispatch({type: "FETCH_ARTICLES_SUCCESS", payload: response.data});
          })
          .catch(function(error) {
            dispatch({type: "FETCH_ARTICLES_FAILURE", payload: error.response.data.message});
        });
      })
      .catch(function(error) {
        dispatch({type: "PAGER_ACTION_FAILURE", payload: error.response.data.message})
      });
  }
}
