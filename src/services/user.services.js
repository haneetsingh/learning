import axios from 'axios';

export const userService = {
  login,
  logout
  // register
};

function login(username, password) {
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
  return axios.post(requestUrl, requestBody, requestOptions)
    .then((response) => {
      return response.data;
    })
    .then((user) => {
      if (user && user.csrf_token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })
    .catch(function(error) {
      return error.response.data.message;
    });
}

function logout() {
  const reqUrl = 'http://d8-dev.com/user/logout';
  const reqOptions = {
    headers: {
      'Content-Type': 'text/html'
    }
  };

  return axios.get(reqUrl, reqOptions)
    .then((response) => {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error)
      // return error.response.data.message;
    });
}
