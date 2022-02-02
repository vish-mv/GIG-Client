import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import {Link} from "react-router-dom";
import InputBase from "@material-ui/core/InputBase/InputBase";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {withStyles} from "@material-ui/core";
import {css} from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const styles = theme => ({
  appBar: {
    backgroundColor: '#282c34'
  },
  grow: {
    flexGrow: 1,
  },
  errorText: {
    fontSize: 14,
    color: "red"
  },
  linkButton: {
    fontSize: 14,
    textAlign: "right",
    margin: 10,
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    this.setState({[key]: value, error: ""});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      this.setState({error: "username/password required!"})
    }
    else {

      let loginUrl = process.env.REACT_APP_SERVER_URL + 'api/user/login';
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      };
      fetch(loginUrl, requestOptions).then(results => {
        return results.json();
      }, error => {
        console.log("error connecting to server");
        this.setState({error: "server error!"})
      }).then(data => {
        this.handleChange("loginResult", data);
        console.log(data);
      });
    }
  }

  render() {
    const {classes, searchKey, location} = this.props;
    return (
      <div className="content">
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <p>
          Login
        </p>
        <p className={classes.errorText}>{this.state.error}</p>
        <form id="login-form" onSubmit={this.handleSubmit} noValidate>
          <TextField
            id="username"
            name="username"
            className="search-text"
            margin="normal"
            placeholder="username"
            onChange={(e) => this.handleChange("username", e.target.value)}
          /><br/>
          <TextField
            id="password"
            name="password"
            className="search-text"
            margin="normal"
            type="password"
            placeholder="password"
            onChange={(e) => this.handleChange("password", e.target.value)}
          /><br/>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button><br/>
          <Link to={'/'} className={classes.linkButton}>go back Home</Link>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
