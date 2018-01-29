import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import { Container, Row, Col, Button, Form, FormGroup, FormText, FormFeedback, Label, Input, Alert } from 'reactstrap';

class UserRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      userpicture: [],
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    // console.log(this.state);
    const { firstname, lastname, username, email, password } = this.state;
    const { dispatch } = this.props;
    if (username && email && password) {
      dispatch(userActions.register(firstname, lastname, username, email, password));
    }
  }

  render(){
    // console.log(this.props.match.params.type)
    const { error } = this.props;
    const { firstname, lastname, username, email, password, userpicture, submitted } = this.state;
    const inlineError = {
      'display': 'block'
    }
    return (
      <Container className="main">
        <h1 className="text-center">User Register</h1>
        { error && <Alert color="danger">{error}</Alert>}
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Form className="register-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input type="text" name="firstname" id="firstname" placeholder="First Name" value={firstname} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="lastname" id="lastname" placeholder="Last Name" value={lastname} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="username" id="username" placeholder="Username" value={username} onChange={this.handleChange} />
                {submitted && !username &&
                  <FormFeedback style={inlineError}>Username is required</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" id="email" placeholder="Enter Email" value={email} onChange={this.handleChange} />
                {submitted && !email &&
                  <FormFeedback style={inlineError}>Email is required</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={this.handleChange} />
                {submitted && !password &&
                  <FormFeedback style={inlineError}>Password cannot be blank</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Picture</Label>
                <Input type="file" name="userpicture" id="user-picture" value={userpicture} onChange={this.handleChange} />
                <FormText color="muted">
                  Your virtual face or picture.<br />
                  One file only.<br />
                  32 MB limit.<br />
                  Allowed types: png gif jpg jpeg.
                </FormText>
              </FormGroup>
                <Button color="primary">Register</Button>
                <Link to="/user/login" className="register btn btn-link">Login</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { registered, error } = state.registration;
  return {
      registered,
      error
  };
}
const connectedRegistration = connect(mapStateToProps)(UserRegister);
export { connectedRegistration as UserRegister };
