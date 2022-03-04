import React, {Component} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import {Link} from "react-router-dom";
import InputBase from "@mui/material/InputBase/InputBase";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/material";
import {css} from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import CountUp from 'react-countup';
import Chip from '@mui/material/Chip';
import Color from 'color';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const counterProps = {
  start: 0,
  duration: 1,
  separator: ",",
  decimals: 0,
  decimal: ",",
  suffix: " ",
  delay: 0,
};

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
  customChipPrimary: {
    margin: theme.spacing.unit,
  },
  customChip: {
    margin: theme.spacing.unit,
    color: "#a42e7f",
    border: "1px solid #a42e7f"
  },
  customChip2: {
    margin: theme.spacing.unit,
    color: "#ef6564",
    border: "1px solid #ef6564"
  }
});

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getStats = this.getStats.bind(this);
    this.state = {
      stats: []
    }
  }

  componentDidMount() {
    this.getStats();
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

  getStats() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/status/', {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json();
      }
      return null
    }).then(data => {
      this.setState({"stat": data.payload})
    });
  }

  render() {
    const {classes, searchKey, location} = this.props;
    const {stat} = this.state;
    if (location.pathname === "/login") {
      return null
    }
    if (location.pathname === "/") { //if home page
      return (

        <div className="content">
          {this.props.user ?
            <Link to={'#'} onClick={this.props.logout} className={classes.loginButton}>{this.props.user} -
              Logout</Link> :
            <Link to={'/login'} className={classes.loginButton}>Login</Link>
          }
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
          {stat ?
            <div style={{paddingTop: 20}}>
              <Chip color="primary" className={classes.customChipPrimary} clickable
                    label={<CountUp {...counterProps} prefix={"Total Entities: "}
                                    end={stat.entity_count}/>}/>
              <Chip color="primary" className={classes.customChipPrimary} clickable
                    label={<CountUp {...counterProps} prefix={"Total Relations: "}
                                    end={stat.relation_count}/>}/>
              <Chip color="primary" className={classes.customChipPrimary} clickable
                    label={<CountUp {...counterProps} prefix={"Total Categories: "}
                                    end={stat.category_wise_count.length}/>}/>


              <div>
                {Array.isArray(stat.category_wise_count) ?
                  stat.category_wise_count.map((category) => (
                    <Chip className={classes.customChip} color="primary" variant="outlined"
                          component="a" href={"/#/search/"+category._id+":"} clickable
                          label={<CountUp {...counterProps} prefix={category._id + ": "}
                                          end={category.category_count}/>}/>
                  )) : null}
              </div>

              <div>
                {Array.isArray(stat.category_group_wise_count) ?
                  stat.category_group_wise_count.map((category_group) => (
                    <Chip className={classes.customChip2} color="primary" variant="outlined"
                          component="a" href={"/#/search/"+category_group._id.join()+":"} clickable
                          label={<CountUp {...counterProps} prefix={category_group._id.join() + ": "}
                                          end={category_group.category_count}/>}/>
                  )) : null}
              </div>

            </div>
            : null}
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
          {this.props.user ?
            <Link to={'#'} onClick={this.props.logout} className={classes.loginButton}>{this.props.user} -
              Logout</Link> :
            <Link to={'/login'} className={classes.loginButton}>Login</Link>
          }
        </AppBar>
      )
    }
  }
}

export default withStyles(styles)(Header);
