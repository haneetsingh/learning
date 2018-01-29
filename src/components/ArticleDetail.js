import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { articleDetailActions } from '../actions/articleDetail.actions';
import { editArticleActions } from '../actions/editArticle.actions';
import { Alert } from 'reactstrap';
const Timestamp = require('react-timestamp');
const baseUrl = 'http://d8-dev.com';
var ContentEditable = require("react-contenteditable");
// var ContentEditable = require('react-wysiwyg');

class ArticleDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeId: null
    };
    this.renderArticle = this.renderArticle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.enableEditing = this.enableEditing.bind(this);
    // this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch, node } = this.props;
    let id = null;
    if (this.props.location.state) {
      id = this.props.location.state.vid;
    }
    if (node && node.data ){
      id = node.data.id;
    }
    // const { dispatch } = this.props;
    dispatch(articleDetailActions.fetchArticleDetails(id));
  }

/*  enableEditing(e) {
    e.preventDefault();
    const editing = e.target.getAttribute('data-edit');
    // this.setState({ editing });
    // e.preventDefault();
    console.log(this.state);
  }

  onChange() {
    // console.log(this.state)
  }

  toggleEdit() {
    const {editing} = this.state;
    this.setState({editing: !editing});
    console.log(this.state);
  }*/

  renderArticle() {
    // console.log()
    const { fetched, article, image, fetchedImage, fetchedDetails, userDetails, author, fetchedAuthor } = this.props
    // console.log(fetchedAuthor)
    // console.log(JSON.parse(localStorage.getItem('uuid')));
    // const userObj = JSON.parse(localStorage.getItem('user'));
    const uuid = JSON.parse(localStorage.getItem('uuid'));
    if (fetched) {
      // console.log(fetchedAuthor)
      // console.log(author)
      // let authorName = null;
      // if (fetchedAuthor && author) {
      //   authorName = author.data.attributes.name;
      // }
      // else {
      //   authorName = 'anonymous';
      // }
      let authorName = null;
      if (fetchedAuthor) {
        // console.log(author.data.attributes.name)
        authorName = author.data.attributes.name;
      }
      else {
        authorName = 'Anonymous';
      }

      const { data } = article;
      const authorId = data.relationships.uid.data.id;
      // let button = null;
      let description = null;
      let role = null;
      if ( fetchedDetails ) {
        role = userDetails.roles_target_id;
      }
      else {
        role = 'anonymous';
      }
      if (data.attributes.field_body) {
        if (role === 'Administrator' || role === 'Editor') {
          // button = <button onClick={this.toggleEdit} data-edit="true">Edit</button>;
          description = <ContentEditable className="description" html={data.attributes.field_body.value} disabled={false} onChange={this.handleChange}/>
        }
        else if (uuid && authorId === uuid[0].value) {
          // button = <button onClick={this.toggleEdit} data-edit="true">Edit</button>;
          description = <ContentEditable className="description" html={data.attributes.field_body.value} disabled={false} onChange={this.handleChange}/>
        }
        else {
          description = <ContentEditable className="description" html={data.attributes.field_body.value} disabled={true} />
        }
      }
      const imgStyles = {
        float: "left",
        margin: '0 1em 0 0'
      }

      return (
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/articles">Articles</Link></li>
            <li className="breadcrumb-item active">{data.attributes.title}</li>
          </ol>
          { !this.props.location.state && <Alert color="success">Article <em className="placeholder">{data.attributes.title}</em> added successfully</Alert> }
          <h1>{data.attributes.title}</h1>
          <article className={data.type} data-node={data.attributes.nid}>
            <h5>Posted by {authorName} on <Timestamp time={data.attributes.created} utc={true} format="date" /></h5>
            <div className="node-content">
              { fetchedImage && data.relationships.field_image.data &&
              <div className="image" style={imgStyles}>
                <img className="img-fluid" src={baseUrl+image.data.attributes.url} alt={data.relationships.field_image.data.meta.alt} title={data.relationships.field_image.data.meta.title}/>
              </div>
              }
              {description}
            </div>
          </article>
        </div>
      );
    }
  }

  handleChange(event) {
    const id = this.props.location.state.vid;
    const updatedBody = event.target.value;
    const node = this.props.article;
    var nodeData = {
      'data': {
        'type': 'node--article',
        'id': `${id}`,
        'attributes': {
          'title': `${node.data.attributes.title}`,
          'field_body': {
            'value': updatedBody,
            'format': `${node.data.attributes.field_body.format}`,
          }
        },
        'relationships': {
          'uid': {
            'data': {
              'type': 'user--user',
              'id': `${node.data.relationships.uid.data.id}`
            }
          }
        }
      }
    };

    // var config = {
    //   headers: {
    //     'Accept': 'application/vnd.api+json',
    //     'Content-Type': 'application/vnd.api+json',
    //     'Authorization': 'Basic YWRtaW46YWRtaW4='
    //   }
    // };

    const { dispatch } = this.props;
    dispatch(editArticleActions.patchArticle(id, nodeData));

  }

  render() {
    // console.log(this)
    return (
      <div className="main container">
        {this.renderArticle()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fetchedDetails, userDetails } = state.getUserDetails;
  const {fetched, article, author, fetchedAuthor } = state.articleDetail;
  const { fetchedImage, image } = state.articleImage;
  const { added, node } = state.nodeAdd;
  return {
    fetched,
    article,
    image,
    fetchedImage,
    fetchedDetails,
    userDetails,
    author,
    fetchedAuthor,
    added,
    node
  };
}

const connectedArticleDetail = connect(mapStateToProps)(ArticleDetail);
export { connectedArticleDetail as ArticleDetail }
// export default ArticleDetail
