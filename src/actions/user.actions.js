import { history } from '../helpers/history';
import axios from 'axios';

export const userActions = {
  login,
  logout,
  register
};

const base_url = 'http://d8-dev.com';


function login(username, password) {
  return function(dispatch) {
    dispatch({type: "LOGIN_REQUEST"});
    const requestUrl = 'http://d8-dev.com/user/login?_format=json';
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const requestBody = {
      'name': username,
      'pass': password
    };

    const encodedString = new Buffer(username + ':' + password).toString('base64');

    axios.post(requestUrl, requestBody, requestOptions)
      .then((response) => {
        dispatch({type: "LOGIN_SUCCESS", payload: response.data})
        localStorage.setItem('user', JSON.stringify(response.data.current_user));
        localStorage.setItem('csrf_token', response.data.csrf_token);
        localStorage.setItem('logout_token', response.data.logout_token);
        localStorage.setItem('auth_token', encodedString);
        // history.push('/');
        history.push('/user/'+response.data.current_user.name);
      })
      .catch(function(error) {
        // console.log(error)
        dispatch({type: "LOGIN_FAILURE", payload: error.response.data.message})
    });

  }
}

function logout() {
  return function(dispatch) {
/*    dispatch({type: "LOGOUT_REQUEST"});
    // const auth_token = localStorage.getItem('auth_token');
    // const csrf_token = localStorage.getItem('csrf_token');
    // const logout_token = localStorage.getItem('logout_token');
    const requestUrl = 'http://d8-dev.com/user/logout';
    // const data = null;
    // const config = {
    //   headers: {
    //     // 'Content-type': 'application/json',
    //     'Authorization': 'Basic '+auth_token,
    //     'X-CSRF-Token': csrf_token
    //   }
    // };

    axios.get(requestUrl)
      .then((response) => {
        // console.log(response.data)
        dispatch({type: "LOGOUT_SUCCESS"});
        localStorage.clear();
        history.push('/');
      })
    .catch(function (error) {
      dispatch({type: "LOGOUT_FAILURE", payload: error.response.data.message})
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
    });*/
    dispatch({type: "LOGOUT"});
    localStorage.clear();
    history.push('/');
  }
}

function register(firstName, lastName, userName, email, password) {
  return function(dispatch) {
    dispatch({type: "USER_REGISTER"});
    const data = {
      'name': {
        'value': userName
      },
      'mail': {
        'value': email
      },
      'pass': {
        'value': password
      },
      'field_first_name': {
        'value': firstName
      },
      'field_last_name': {
        'value': lastName
      }
    };
    const config = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    const url = base_url+'/user/register?_format=json';
    axios.post(url, data, config)
      .then((response) => {
        dispatch({type: "USER_REGISTER_SUCCESS", payload: response.data});
        // console.log(response.data.name[0].value)
        history.push('/user/login');
      })
      .catch(function(error) {
        dispatch({type: "USER_REGISTER_FAILURE", payload: error.response.data.message});
        if (error.response) {
          console.log(error.response)
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }
}
