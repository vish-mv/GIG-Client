import React, {useState, useEffect} from 'react';
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import InputBase from "@mui/material/InputBase/InputBase";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import BeatLoader from 'react-spinners/BeatLoader';
import CountUp from 'react-countup';
import Chip from '@mui/material/Chip';
import {counterProps, override, Styles} from "./Styles";
import {Link, useNavigate, useLocation} from "react-router-dom";


function Header(props) {
  const location = useLocation();
  const {classes, searchKey, setSearchKey, user, logout,isLoading} = props;
  const [stat, setStat] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (this.props.searchKey.length > 1) {
      this.props.history.push(`/search/` + this.props.searchKey);

      if (this.props.location.pathname !== "/") {
        this.props.getSearchResults(this.props.searchKey);
      }
    }
  }

  function getStats() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/status/', {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json();
      }
      return null
    }).then(data => {
      setStat(data.payload)
    });
  }

  useEffect(() => {
    if (!stat){
      getStats();
    }
  },[stat]);

  if (location.pathname === "/login") {
    return null
  }
  if (location.pathname === "/") { //if home page
    return (

      <div className="content">
        {user ?
          <Link to={'#'} onClick={logout} className={classes.loginButton}>{user} -
            Logout</Link> :
          <Link to={'/login'} className={classes.loginButton}>Login</Link>
        }
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            fullWidth={true}
            id="search-input"
            name="search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
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
                        component="a" href={"/#/search/" + category._id + ":"} clickable
                        label={<CountUp {...counterProps} prefix={category._id + ": "}
                                        end={category.category_count}/>}/>
                )) : null}
            </div>

            <div>
              {Array.isArray(stat.category_group_wise_count) ?
                stat.category_group_wise_count.map((category_group) => (
                  <Chip className={classes.customChip2} color="primary" variant="outlined"
                        component="a" href={"/#/search/" + category_group._id.join() + ":"} clickable
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
                onChange={(e) => setSearchKey(e.target.value)}
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
            loading={isLoading}
          />
          <div className={classes.grow}/>
        </Toolbar>
        {user ?
          <Link to={'#'} onClick={logout} className={classes.loginButton}>{user} -
            Logout</Link> :
          <Link to={'/login'} className={classes.loginButton}>Login</Link>
        }
      </AppBar>
    )
  }
}

export default withStyles(Styles)(Header);
