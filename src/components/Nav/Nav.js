import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';



import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import './Nav.css';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';

let mapStateToProps = (state) => ({
  user: state.user,
});

const styles = theme => ({

  root: {
    color: 'inherit',
  },

  primary: {
    color: '#fff',
    fontFamily: "'Audiowide', 'sans-serif'",
  }
});


class Nav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });

    const hamburger = document.querySelector(".hamburger");

    hamburger.classList.toggle("is-active");
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  render() {

    const { classes } = this.props;

    let content = null;

    let logOutBtn = null;

    if (this.props.user) {
      logOutBtn = (
        <Button
          className={classes.primary}
          onClick={this.logout}
        >
          Log Out
          </Button>
      )
    }

    if (this.props.user.role === "player") {
      content = (
        <Navbar dark expand="md" scrolling className={classes.primary}>
          <NavbarBrand href="/#/landing_page">
              <img className="logo"
              src="images/pprLogo.png"
                alt="logo">
              </img>
          </NavbarBrand>
          {!this.state.isWideEnough &&
            <NavbarToggler onClick={this.onClick}>
              <div className="hamburger hamburger--3dx" id="hamburger" >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </div>
            </NavbarToggler>}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className={classes.primary}>
                <NavLink to="/landing_page">Home</NavLink>
              </NavItem>
              <NavItem >
                <NavLink to="/player_profile_page">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/teams">Teams</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/suspend_page">Account Options</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/terms">Terms</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem className={classes.primary}>
                <NavLink to="/contact">Contact</NavLink>
              </NavItem>
              {logOutBtn}
            </NavbarNav>
          </Collapse>
        </Navbar>

      );
    }
    else if (this.props.user.role === "coach") {
      content = (
        <Navbar dark expand="md" scrolling>
          <NavbarBrand href="/#/landing_page">
              <img className="logo"
                src="images/pprLogo.png"
                alt="logo">
              </img>
          </NavbarBrand>
          {!this.state.isWideEnough &&
            <NavbarToggler onClick={this.onClick}>
              <div className="hamburger hamburger--3dx" id="hamburger" >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </div>
            </NavbarToggler>}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className={classes.primary}>
                <NavLink to="/landing_page">Home</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/teams">Teams</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/players_page">Player List</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/terms">Terms</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem className={classes.primary}>
                <NavLink to="/contact">Contact</NavLink>
              </NavItem>
              {logOutBtn}
            </NavbarNav>
          </Collapse>
        </Navbar>

      );
    }
    else if (this.props.user.role === "admin") {
      content = (
        <Navbar dark expand="md" scrolling>
          <NavbarBrand href="/#/landing_page">
              <img className="logo"
                src="images/pprLogo.png"
                alt="logo">
              </img>
          </NavbarBrand>
          {!this.state.isWideEnough &&
            <NavbarToggler onClick={this.onClick}>
              <div className="hamburger hamburger--3dx" id="hamburger" >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </div>
            </NavbarToggler>}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className={classes.primary}>
                <NavLink to="/landing_page">Home</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/teams">Teams</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/players_page">Player List</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/admin_coach_list_page">Coach List</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/admin_page">Add Coaches</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/terms">Terms</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem className={classes.primary}>
                <NavLink to="/contact">Contact</NavLink>
              </NavItem>
              {logOutBtn}
            </NavbarNav>
          </Collapse>
        </Navbar>

      )
    }
    else {
      content = (
        <Navbar dark expand="md" scrolling>
          <NavbarBrand href="/#/landing_page">
              <img className="logo"
                src="images/pprLogo.png"
                alt="logo">
              </img>
          </NavbarBrand>
          {!this.state.isWideEnough &&
            <NavbarToggler onClick={this.onClick}>
              <div className="hamburger hamburger--3dx" id="hamburger" >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </div>
            </NavbarToggler>}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className={classes.primary}>
                <NavLink to="/landing_page">Home</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/teams">Teams</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/register">Sign Up</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/terms">Terms</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem className={classes.primary}>
                <NavLink to="/contact">Contact</NavLink>
              </NavItem>
              <NavItem className={classes.primary}>
                <NavLink to="/login">Log In</NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>

      )
    }
    return (
      <div className="navbarContainer">{content}</div>
    );
  }
}

const NavStyled = withStyles(styles)(Nav);

export default connect(mapStateToProps)(NavStyled);
