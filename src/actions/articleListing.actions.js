import axios from 'axios';
const base_url = 'http://d8-dev.com';
const api_url = '/jsonapi/node/article/';
const page_num = 15;

export const articlesListingActions = {
  fetchArticles,
  fetchArticleDetailInline
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

function fetchArticleDetailInline(url) {
  return function(dispatch) {
    dispatch({type: "FETCH_ARTICLE_DETAILS"});
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_ARTICLE_DETAILS_SUCCESS", payload: response.data});
        const relationship = response.data.data.relationships;
        if (relationship.field_image && relationship.field_image.links) {
          dispatch({type: "FETCH_ARTICLE_IMAGE"});
          const relImage = relationship.field_image.links.related;
          axios.get(relImage)
            .then((response) => {
              dispatch({type: "FETCH_ARTICLE_IMAGE_SUCCESS", payload: response.data});
              // console.log(response);
            })
            .catch(function(error) {
              dispatch({type: "FETCH_ARTICLE_IMAGE_FAILURE", payload: error.response.data.message});
          });
        }
        if (relationship.uid && relationship.uid.data) {
          dispatch({type: "FETCH_ARTICLE_AUTHOR"});
          const uid = relationship.uid.data.id;
          axios.get(base_url+'/jsonapi/user/user/'+uid)
            .then((response) => {
              dispatch({type: "FETCH_ARTICLE_AUTHOR_SUCCESS", payload: response.data});
            })
            .catch(function(error) {
              dispatch({type: "FETCH_ARTICLE_AUTHOR_FAILURE", payload: error.response.data.message});
            })
        }
      })
      .catch(function(error) {
        dispatch({type: "FETCH_ARTICLE_DETAILS_FAILURE", payload: error});
    });
  }
}
