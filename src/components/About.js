import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactActions } from '../actions/contact.actions';
import { Alert, Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';

class About extends Component {
  constructor(props) {
    super(props);
    this.state= {
      name: '',
      email: '',
      subject: '',
      message: '',
      visible: true,
      submitted: false
    };
    this.baseState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleClick(event) {
    console.log(event.target)
  }


  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    // console.log(this.state);
    const { name, email, subject, message } = this.state;
    const { dispatch, clearInput } = this.props;
    if (email && message) {
      dispatch(contactActions.sendMessage(name, email, subject, message));
      // console.log(clearInput);
      if (clearInput) {
        this.setState(this.baseState);
      }
    }
  }

  render() {
    const { name, email, subject, message, visible, submitted } = this.state;
    // const visible = true;
    // console.log(visible);
    const { success, error } = this.props;
    const inlineError = {
      'display': 'block'
    };
    return (
      <Container className="main">
        <h1>About</h1>
        { success &&
          <Alert color="success" isOpen={visible} toggle={this.onDismiss}>{success}</Alert>
        }
        { error &&
         <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>{error}</Alert>
        }
        <Row>
          <Col sm={{ size: 6 }}>
            <Form className="contact" onSubmit={this.onSubmit}>
              <FormGroup>
                <Input type="text" name="name" id="name" placeholder="Name" value={name} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" id="email" placeholder="Enter Email" value={email} onChange={this.onChange} />
                {submitted && !email &&
                  <FormFeedback style={inlineError}>Email is required</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Input type="text" name="subject" id="subject" placeholder="Subject" value={subject} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input rows="5" type="textarea" name="message" id="message" placeholder="Your message" value={message} onChange={this.onChange} />
                {submitted && !message && <FormFeedback style={inlineError}>Please add your message</FormFeedback>}
              </FormGroup>
              <Button color="primary">Send</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { sent, success, error, clearInput } = state.contact;
  return { sent, success, error, clearInput };
}

const connectedContact = connect(mapStateToProps)(About);
export { connectedContact as About };
// export default About
