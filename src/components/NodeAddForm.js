import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import CKEditor from "react-ckeditor-component";
// import ReactTags from 'react-tag-autocomplete';
// const ReactTags = require('react-tag-autocomplete')
import { connect } from 'react-redux';
import { nodeAddActions } from '../actions/nodeAdd.actions';
import { Container, Row, Col, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

class NodeAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      // tags: [],
      files: [],
      body: '',
      isChecked: true,
      submitted: false
    };
    this.getFiles = this.getFiles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    // this.handleAddition = this.handleAddition.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  onBlur(evt){
    // console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt){
    // console.log("afterPaste event called with event info: ", evt);
  }

  onChange(evt){
    // console.log("onChange fired with event info: ", evt);
    const newContent = evt.editor.getData();
    // console.log(newContent);
    this.setState({
      body: newContent
    })
  }

  toggleCheckboxChange(event) {
    const { isChecked } = this.state;
    this.setState({
      isChecked: !isChecked
    })
  }

  getFiles(files){
    this.setState({ files: files })
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { title, files, body, isChecked } = this.state
    console.log(this.state);
    let status = null;
    if (isChecked) {
      status = true;
    }
    else {
      status = false;
    }
    const { dispatch } = this.props;
    const nodeType = this.props.match.params.name;
    dispatch(nodeAddActions.addNode(title, body, files, nodeType, status));
  }

 // handleDelete (i) {
 //    const tags = this.state.tags.slice(0)
 //    tags.splice(i, 1)
 //    this.setState({ tags })
 //  }

 //  handleAddition (tag) {
 //    const tags = [].concat(this.state.tags, tag)
 //    this.setState({ tags })
 //  }

  render() {
    const node = this.props.match.params.name;
    const { title, body, isChecked, submitted } = this.state;
    const inlineError = {
      'display': 'block'
    }

    return (
      <Container className="main">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">Add content</li>
        </ol>
        <h1>Create {node}</h1>
          <Row>
            <Col sm={{ size: 8 }}>
              <Form className={"node-add node-add--"+node} onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={title} onChange={this.handleChange} />
                  { submitted && !title && <FormFeedback style={inlineError}>Title is required</FormFeedback> }
                </FormGroup>
                <FormGroup>
                  <Label for="file">Image</Label>
                  <FileBase64 multiple={ false } onDone={ this.getFiles } />
                </FormGroup>
                <FormGroup>
                  <Label for="body">Body</Label>
                  <CKEditor activeClass="p10" content={body} events={{"blur": this.onBlur, "afterPaste": this.afterPaste, "change": this.onChange}} />
                </FormGroup>
                <FormGroup check className="mb-3">
                  <Label check>
                    <Input type="checkbox" checked={isChecked} value="publish" onChange={this.toggleCheckboxChange} />{' '}
                    Published
                  </Label>
                </FormGroup>
                <Button color="primary">Save</Button>
              </Form>
            </Col>
          </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { added, error } = state.nodeAdd;
  return {
    added,
    error
  };
}
const connectedNodeAdd = connect(mapStateToProps)(NodeAddForm);
export { connectedNodeAdd as NodeAddForm };
