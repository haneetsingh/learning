import React, { Component } from 'react';
// import axios from 'axios';
import { articlesListingActions } from '../actions/articleListing.actions';
import { pagerActions } from '../actions/pager.actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
const Timestamp = require('react-timestamp');

class Articles extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   pager: [],
    //   loading: false
    // }
    this.pager = this.pager.bind(this);
    this.renderListing = this.renderListing.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(articlesListingActions.fetchArticles());
  }

  renderListing() {
    const { fetched, list } = this.props;
    const cardHeight = {
      height: '100%'
    }

    if (fetched) {
      return list.data.map(listItem => {
        return (
          <div className="col-sm-4 mb-3" key={listItem.id} data-node={listItem.attributes.nid}>
            <Card style={cardHeight}>
              <CardHeader>{listItem.attributes.title}</CardHeader>
              <CardBody>
                { listItem.attributes.field_body &&
                  <div className="card-text" dangerouslySetInnerHTML={{__html: listItem.attributes.field_body.value ? listItem.attributes.field_body.value.slice(0,200) : ''}} />
                }
                { listItem.attributes.path &&
                  <Link to = {{
                    pathname: `${listItem.attributes.path.alias}`,
                    state: { vid: listItem.id }
                  }} className="card-link">Read More</Link>
                }
              </CardBody>
              <CardFooter><Timestamp time={listItem.attributes.created} utc={true} /></CardFooter>
            </Card>
          </div>
        )
      })
    }
  }

  pager() {
    const { fetched, list } = this.props;
    if (fetched) {
      const { links } = list;
      const pager = Object.entries(links).map(([key,value]) => {
        if (key !== 'self') {
          return (
            <li key={key} className="page-item"><a className="page-link" href={value} onClick={this.handleClick} data-url={value}>{key}</a></li>
          )
        }
        return null;
      });
      return pager;
    }
  }

  handleClick(event) {
    event.preventDefault();
    const url = event.target.getAttribute('data-url');
    const { dispatch } = this.props;
    dispatch(pagerActions.fetchPageItems(url));
    // axios.get(url)
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   })

  }

  render() {
    // console.log(this)
    const pagerStyle = {
      justifyContent: "center"
    }
    return (
      <div className="main container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">Articles</li>
        </ol>
        <h1>Articles</h1>
        <div className="row">
          {this.renderListing()}
        </div>
        <div className="my-2">
          <ul className="pagination pagination-lg" style={pagerStyle}>
            {this.pager()}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {fetched, list} = state.articleList
  return {
    fetched,
    list
  };
}

const connectedArticles = connect(mapStateToProps)(Articles);
export { connectedArticles as Articles }
