import axios from 'axios';
import { history } from '../helpers/history';
var slugify = require('slugify');

const base_url = 'http://d8-dev.com';
export const nodeAddActions = {
  addNode
}

function addNode(title, body, files, type, status) {
  return function(dispatch) {
    const encodedString = localStorage.getItem('auth_token');
    // const csrf_token = localStorage.getItem('csrf_token');
    dispatch({type: "NODE_ADD"});
    const config = {
      'headers': {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Basic '+encodedString
      }
    };

    let data, path = null;
    path = slugify(title, {
      replacement: '-',
      remove: null,
      lower: true
    });
    if (type === 'article') {
      data = {
        'data': {
          'type': 'node--'+type,
          'attributes': {
            'title': title,
            'status': status,
            'field_body': {
              'value': body,
              'format': 'basic_html'
            },
            'path': {
              'alias': '/article/'+path
            }
          }
        }
      };
    }
    else {
      data = {
        'data': {
          'type': 'node--'+type,
          'attributes': {
            'title': title,
            'status': status,
            'body': {
              'value': body,
              'format': 'basic_html'
            }
          }
        }
      };
    }
    // console.log(data)
    const url = base_url+'/jsonapi/node/'+type;
    axios.post(url, data, config)
      .then((response) => {
        dispatch({type: "NODE_ADD_SUCCESS", payload: response.data});
        history.push('/article/'+path);
      })
      .catch(function(error) {
        dispatch({type: "NODE_ADD_FAILURE", payload: error.response.data.message});
      });

/*      if (files) {
        console.log(files);
        dispatch({type: "FILE_ADD"});
        const fileUrl = base_url+'/entity/file';
        const fileConfig = {
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+encodedString,
            'X-CSRF-Token': csrf_token
          }
        };
        const fileData = {
          '_links': {
            'type': {
              'href': base_url+'/rest/type/file/image'
            }
          },
          'filename': [
            {
              'value': files.name
            }
          ],
          'filemime': [
            {
            'value': files.type
            }
          ],
          'filesize': [
            {
              'value': files.size
            }
          ],
          'type': [
            {
              'target_id': 'image'
            }
          ],
          'data': [
            {
              'value': files.base64
            }
          ]
        };
        axios.post(fileUrl, fileData, fileConfig)
          .then((response) => {
            dispatch({type: "FILE_ADD_SUCCESS", payload: response.data});
          })
          .catch(function(error) {
            dispatch({type: "FILE_ADD_FAILURE", payload: error.response});
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
          })
      }*/
  }
}
