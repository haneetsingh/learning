import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
    // this.props.dispatch(userActions.getAll());
  // }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
  render() {
    // console.log(JSON.parse(localStorage.getItem('user')))
    const user = JSON.parse(localStorage.getItem('user'));
    const csrf_token = localStorage.getItem('csrf_token');
    return (
      <Navbar color="primary" dark expand="md">
        <div className="container">
          <NavbarBrand href="/">React Redux Demo App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/" exact activeClassName="active" tag={RRNavLink}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/list/articles" exact activeClassName="active" tag={RRNavLink}>ArticleList</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/articles" exact activeClassName="active" tag={RRNavLink}>Articles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" exact activeClassName="active" tag={RRNavLink}>About</NavLink>
              </NavItem>
              {user && csrf_token &&
                <UncontrolledDropdown nav>
                  <DropdownToggle nav caret>
                    <span className="oi oi-person" title="icon person" aria-hidden="true"></span>
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem href={"/user/"+user.name}>
                      Profile
                    </DropdownItem>
                    <DropdownItem href="/user/logout" onClick={this.handleClick}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {!user &&
                <NavItem>
                  <NavLink to="/user/login" activeClassName="active" tag={RRNavLink}>Login</NavLink>
                </NavItem>
              }
              {!user &&
                <NavItem>
                  <NavLink to="/user/register" activeClassName="active" tag={RRNavLink}>Register</NavLink>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { user, loggedIn, loggingIn } = state.authentication;
  return {
    user,
    loggingIn,
    loggedIn
  };
}

const connectedNavigation = connect(mapStateToProps)(Navigation);
export { connectedNavigation as Navigation }
// export default Navigation
