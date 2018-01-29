import axios from 'axios';

const base_url = 'http://d8-dev.com';
export const getUserDetailsActions = {
  getUserDetails
}

function getUserDetails(token) {
  return function(dispatch) {
    dispatch({type: "FETCH_USER_DETAILS"})
    const url = base_url+'/rest/user/current';
    var config = {
      headers: {
        'Authorization': 'Basic '+ token
      }
    };
    axios.get(url, config)
      .then((response) => {
        dispatch({type: "FETCH_USER_DETAILS_SUCCESS", payload: response.data[0]})
      })
      .catch(function(error) {
        dispatch({type: "FETCH_USER_DETAILS_FAILURE", payload: error.response.data.message})
      });
  }
}
