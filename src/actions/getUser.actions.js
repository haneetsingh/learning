import axios from 'axios';

const base_url = 'http://d8-dev.com';
export const getUserActions = {
  getUser
}

function getUser(id, token) {
  return function(dispatch) {
    dispatch({type: "FETCH_USER"})
    const url = base_url+'/user/'+id+'?_format=json';
    var config = {
      headers: {
        'Authorization': 'Basic '+ token
      }
    };
    // console.log(url)
    axios.get(url, config)
      .then((response) => {
        // console.log(response)
        dispatch({type: "FETCH_USER_SUCCESS", payload: response.data});
        localStorage.setItem('uuid', JSON.stringify(response.data.uuid));
        dispatch({type: "FETCH_USER_DETAILS"})
        axios.get(base_url+'/rest/user/current', config)
          .then((response) => {
            dispatch({type: "FETCH_USER_DETAILS_SUCCESS", payload: response.data[0]})
          })
          .catch(function(error) {
            dispatch({type: "FETCH_USER_DETAILS_FAILURE", payload: error.response.data.message})
          })
      })
      .catch(function(error) {
        dispatch({type: "FETCH_USER_FAILURE", payload: error.response.data.message});
      });
  }
}
