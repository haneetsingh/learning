import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserActions } from '../actions/getUser.actions';
import { getUserDetailsActions } from '../actions/getUserDetails.actions';
const baseUrl = 'http://d8-dev.com';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      loaded: false
    }
    this.renderUserDetails = this.renderUserDetails.bind(this);
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentUser.uid;
    const encodedString = localStorage.getItem('auth_token');
    const { dispatch } = this.props;
    dispatch(getUserActions.getUser(userId, encodedString));
    dispatch(getUserDetailsActions.getUserDetails(encodedString));
  }

/*  componentWillReceiveProps() {
    // console.log('will recieve props: ', this.props)
    const { fetchedDetails, userDetails } = this.props;
    // console.log(fetchedDetails)
    if (fetchedDetails) {
      this.setState({
        userDetails,
        loaded: true
      });
    }
  }*/

  renderUserDetails() {
    const { fetchedDetails, userDetails } = this.props;
    // console.log(this);
    if (fetchedDetails) {
      const { name, user_picture, field_first_name, field_last_name } = userDetails;
      let userName, firstName, lastName = null;
      if (field_first_name) {
        firstName = field_first_name
      }
      if (field_last_name) {
        lastName =field_last_name;
      }
      if (firstName && lastName) {
        userName = firstName+' '+lastName;
      }
      else if (firstName) {
        userName = firstName;
      }
      else if (lastName) {
        userName = lastName;
      }
      else {
        userName = name;
      }

      return (
        <div className="user-details">
          <div className="user-image">
          { user_picture &&
            <img src={baseUrl+user_picture} className="img-thumbnail mx-auto d-block" />
          }
          </div>
          <h2 className="user-name text-center">{userName}</h2>
          <div className="add-node">
            <h3 className="title">Add Content</h3>
            <div className="add-content">
              <ul>
                <li><Link to="/node/add/article">Article</Link></li>
                <li><Link to="/node/add/page">Basic Page</Link></li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }


  render() {
    // const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="main container">
        <h1 className="page-title">User Profile</h1>
        {this.renderUserDetails()}
      </div>
    );
  }
}

// export default UserProfile

function mapStateToProps(state) {
  const { fetchedDetails, userDetails } = state.getUserDetails;
  const { fetched, userData } = state.getUser;
  return {
    fetched,
    userData,
    fetchedDetails,
    userDetails
  };
}

const connectedUserProfile = connect(mapStateToProps)(UserProfile)
export { connectedUserProfile as UserProfile }

