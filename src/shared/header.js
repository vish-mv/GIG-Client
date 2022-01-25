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
  loginButton: {
    fontSize: 14,
    textAlign: "right",
    margin: 10,
    position: "absolute",
    right: 0,
    top: 12,
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

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.searchKey.length > 1) {
      this.props.history.push(`/search/` + this.props.searchKey);

      if (this.props.location.pathname !== "/") {
        this.props.getSearchResults(this.props.searchKey);
      }
    }
  }

  render() {
    const {classes, searchKey, location} = this.props;
    if (location.pathname === "/login") {return null}
    if (location.pathname === "/") { //if home page
      return (

        <div className="content">
          <Link to={'/login'} className={classes.loginButton}>Login</Link>
          <h1>GIG</h1>
          <p>
            General Information Graph
          </p>
          <form id="search-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <TextField
              fullWidth={true}
              id="search-input"
              name="search"
              value={searchKey}
              onChange={(e) => this.props.handleChange("searchKey", e.target.value)}
              className="search-text"
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </form>
        </div>
      );
    }
    else {    // if not homepage
      return (
        <AppBar position="static" style={{marginTop: 0}}>
          <Toolbar className={classes.appBar}>
            <Typography component={Link} to="/" style={{textDecoration: 'none'}} className={classes.menuButton}
                        variant="h6"
                        color="inherit" noWrap>
              General Information Graph
            </Typography>
            <div className={classes.search}>
              <form id="search-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <InputBase
                  name="search"
                  placeholder="Search…"
                  value={searchKey}
                  onChange={(e) => this.props.handleChange("searchKey", e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            </div>
            <BeatLoader
              css={override}
              sizeUnit={"px"}
              size={14}
              color={'#36D7B7'}
              loading={this.props.loading}
            />
            <div className={classes.grow}/>
          </Toolbar>
          <Link to={'/login'} className={classes.loginButton}>Login</Link>
        </AppBar>
      )
    }
  }
}

export default withStyles(styles)(Header);
