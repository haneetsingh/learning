import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { articlesListingActions } from '../actions/articleListing.actions';
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardImg } from 'reactstrap';
const baseUrl = 'http://d8-dev.com';
const Timestamp = require('react-timestamp');

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderArticleDetail = this.renderArticleDetail.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(articlesListingActions.fetchArticles());
  }

  handleClick(event) {
    event.preventDefault();
    console.log(event.target)
    const { active } = this.state;
    const url = event.target.getAttribute('data-url');
    this.setState({active: !active});
    const { dispatch } = this.props;
    dispatch(articlesListingActions.fetchArticleDetailInline(url));
  }

  renderList() {
    const { active } = this.state;
    const { fetched, list } = this.props;
    if (fetched) {
      return list.data.map(items => {
        return(
          <ListGroupItem key={items.id} tag="a" href="#" data-url={items.links.self} onClick={this.handleClick}>{items.attributes.title}</ListGroupItem>
        )
      })
    }
  }

  renderArticleDetail() {
    const {fetchedArticle, article, author, fetchedAuthor, image, fetchedImage } = this.props;
    if (fetchedArticle) {
      const { data } = article;
      let authorName = null;
      if (fetchedAuthor) {
        authorName = author.data.attributes.name;
      }
      else {
        authorName = 'Anonymous';
      }
      return (
        <Card>
          { fetchedImage && data.relationships.field_image.data &&
            <img src={baseUrl+image.data.attributes.url} className="img-fluid" />
          }
          <CardBody>
            <CardTitle>{data.attributes.title}</CardTitle>
            <CardSubtitle>By {authorName}</CardSubtitle>
            { data.attributes.field_body &&
              <div className="card-text" dangerouslySetInnerHTML={{__html: data.attributes.field_body.value }} />
            }
          </CardBody>
          <CardFooter className="text-muted"><small>Posted <Timestamp time={data.attributes.created} utc={true} /></small></CardFooter>
        </Card>
      )
    }
  }

  render() {
    return (
      <Container className="main">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">ArticleList</li>
        </ol>
        <h1>Article Listing</h1>
        <Row>
          <Col sm={{ size: 3 }}>
            <ListGroup>{this.renderList()}</ListGroup>
          </Col>
          <Col sm={{ size: 9 }}>{this.renderArticleDetail()}</Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const { fetched, list} = state.articleList;
  const { fetchedImage, image } = state.articleImage;
  const { fetchedArticle, article, author, fetchedAuthor } = state.articleDetail;
  return {
    fetched,
    list,
    article,
    fetchedArticle,
    author,
    fetchedAuthor,
    image,
    fetchedImage
  };
}
const connectedArticleList = connect(mapStateToProps)(ArticleList);
export { connectedArticleList as ArticleList }
