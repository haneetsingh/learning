import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import { Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback, Alert } from 'reactstrap';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    // this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
        submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.props);
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render(){
    const { loggingIn, error } = this.props;
    const { username, password, submitted } = this.state;
    const inlineError = {
      'display': 'block'
    }

    return (
      <Container className="main">
        <h1 className="text-center">User Login</h1>
        { error &&
         <Alert color="danger">{error}</Alert>
        }
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Form className="login-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input type="text" name="username" id="username" placeholder="Enter Username" value={username} onChange={this.handleChange} />
                {submitted && !username &&
                  <FormFeedback style={inlineError}>Username is required</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={this.handleChange} />
                {submitted && !password &&
                  <FormFeedback style={inlineError}>Password is required</FormFeedback>
                }
              </FormGroup>
              <Button color="primary">Login</Button>
              {loggingIn &&
                <img alt="Loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Link to="/user/register" className="register btn btn-link">Register</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, error } = state.authentication;
  return {
      loggingIn,
      error
  };
}

const connectedLoginPage = connect(mapStateToProps)(UserLogin);
export { connectedLoginPage as UserLogin };
// export default UserLogin
