import React from 'react';
import InputBase from "@mui/material/InputBase/InputBase";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import BeatLoader from 'react-spinners/BeatLoader';
import Styles, {override} from "../../../styles/Styles";
import {Link, useLocation, useNavigate, Outlet} from "react-router-dom";
import './Header.css'
import {logout} from "../../../auth/User";

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const {classes, user, isLoading, setIsLoading, setUser, searchKey, setSearchKey} = props;

  function handleSubmit(event) {
    event.preventDefault();
    const routePath = '/search/';
    const url = routePath + encodeURI(searchKey);
    if (searchKey.length > 1 && url !== location.pathname) {
      setIsLoading(true);
      navigate(url);
    }
  }

  return (
    <div>
      <AppBar position="static" style={{marginTop: 0}}>
        <Toolbar className={classes.appBar}>
          <Typography component={Link} to="/" style={{textDecoration: 'none'}} className={classes.menuButton}
                      variant="h6"
                      color="inherit" noWrap>
            General Information Graph
          </Typography>
          <div className={classes.search} style={{width: '50%'}}>
            <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off">
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
          <Link to={'#'} onClick={() => logout(setUser)} className={classes.loginButton}>{user} -
            Logout</Link> :
          <Link to={'/login'} className={classes.loginButton}>Login</Link>
        }
      </AppBar>
      <Outlet/>
    </div>
  )
}

export default withStyles(Styles)(Header);
