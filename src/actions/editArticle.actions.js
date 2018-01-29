import axios from 'axios';
const base_url = 'http://d8-dev.com';
const api_url = '/jsonapi/node/article/';

export const editArticleActions = {
  patchArticle
}

function patchArticle(id, data) {
  return function(dispatch) {
    dispatch({type: "EDIT_ARTICLE"});
    const url = base_url+api_url+id;
    const encodedString = localStorage.getItem('auth_token');
    // const csrf_token = localStorage.getItem('csrf_token');
    var config = {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Basic '+encodedString
      }
    };
    axios.patch(url, data, config)
      .then((response) => {
        dispatch({type: "EDIT_ARTICLE_SUCCESS", payload: response.data})
      })
      .catch(function(error) {
        dispatch({type: "EDIT_ARTICLE_FAILURE", payload: error.response.data.message})
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
}
