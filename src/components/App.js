import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import {Navigation} from './Nav'
import Home from './Home';
import {About} from './About';
import {Articles} from './Articles';
import {ArticleDetail} from './ArticleDetail';
import {UserLogin} from './UserLogin';
import {UserRegister} from './UserRegister';
import {UserProfile} from './UserProfile';
import {NodeAddForm} from './NodeAddForm';
import { history } from '../helpers/history';
import { PrivateRoute } from './PrivateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import '../open-iconic/font/css/open-iconic-bootstrap.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
        <Route component={Navigation} />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/articles" component={Articles}/>
          <Route path="/about" component={About}/>
          <Route path="/article/:name" component={ArticleDetail}/>
          <Route path="/user/login" component={UserLogin}/>
          <Route path="/user/register" component={UserRegister}/>
          <PrivateRoute path="/user/:name" component={UserProfile}/>
          <Route path="/node/add/:name" component={NodeAddForm}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App
