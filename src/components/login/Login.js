import React, {Component} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link} from "react-router-dom";
import {withStyles} from "@mui/styles";
import {css} from '@emotion/react';
import Color from 'color';

const queryString = require('query-string');

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
    backgroundColor: Color(theme.palette.common.white).alpha(0.15).string(),
    '&:hover': {
      backgroundColor: Color(theme.palette.common.white).alpha(0.25).string(),
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
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      };
      fetch(loginUrl, requestOptions).then(results => {
        return results.json();
      }, error => {
        console.log("error connecting to server");
        this.setState({error: "server error!"})
      }).then(data => {
        if (data) {
          this.handleChange("loginResult", data);
          if (data.status === 403) {
            this.setState({error: data.payload});
          }
          else if (data.status === 200) {
            this.props.handleChange("user", this.state.username);
            localStorage.setItem('token', data.payload);
            localStorage.setItem('username', this.state.username);
            let redirect_path = queryString.parse(this.props.location.search).redirect;
            if (redirect_path === undefined) {
              this.props.history.push('/');
            } else {
              this.props.history.push('/edit/' + redirect_path);
            }
          }
          else {
            this.setState({error: "login error!"});
          }
        }
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
