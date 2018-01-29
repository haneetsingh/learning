import axios from 'axios';
// import { history } from '../helpers/history';
const base_url = 'http://d8-dev.com';

export const contactActions = {
  sendMessage,
  // hideAlert
};

function sendMessage(name, mail, subject, message) {
  return function(dispatch) {
    dispatch({type: "CONTACT_REQUEST"});
    const url = base_url+'/contact_message?_format=json';
    const data = {
      'contact_form':[{'target_id': 'feedback'}],
      'uid':[{'target_id': 'feedback'}],
      'name':[{'value': name}],
      'mail':[{'value': mail}],
      'subject':[{'value': subject}],
      'message':[{'value': message}]
    };
    let csrf_token = null;
    let config = null;
    // console.log(csrf_token)
    if (localStorage.getItem('csrf_token')) {
      csrf_token = localStorage.getItem('csrf_token');
    }
    else {
      axios.get(base_url+'/rest/session/token')
        .then((response) => {
          localStorage.setItem('csrf_token_anonymous', response.data);
        });
      csrf_token = localStorage.getItem('csrf_token_anonymous');
    }
    if (localStorage.getItem('auth_token')) {
      const auth_token = localStorage.getItem('auth_token');
      config = {
        'headers': {
          'X-CSRF-Token': csrf_token,
          'Authorization': 'Basic '+auth_token
        }
      };
    }
    else {
      config = {
        'headers': {
          'X-CSRF-Token': csrf_token
          // 'Authorization': 'Basic '
        }
      };
    }

    // console.log(config);

    axios.post(url, data, config)
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          dispatch({type: "CONTACT_REQUEST_SUCCESS", payload: 'Your message has been sent successfully'});
          dispatch({type: "CLEAR_FORM"});
        }
      })
      .catch(function(error) {
        dispatch({type: "CONTACT_REQUEST_FAILURE", payload: error.response.data.message});
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

// function hideAlert() {
//   return function(dispatch) {
//     dispatch({type: "HIDE_ALERT"});
//   }
// }
