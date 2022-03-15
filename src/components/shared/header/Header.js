import React from 'react';
import InputBase from "@mui/material/InputBase/InputBase";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import BeatLoader from 'react-spinners/BeatLoader';
import Styles, {override} from "./Styles";
import {Link, useLocation, useNavigate, Outlet} from "react-router-dom";
import './Header.css'
import {logout} from "../../../auth/User";
import Button from "@mui/material/Button/Button";
import Grid from '@mui/material/Grid';
import {AppRoutes} from "../../../routes";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import IconButton from "@mui/material/IconButton/IconButton";

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const {classes, user, isLoading, setIsLoading, setUser, searchKey, setSearchKey} = props;

  function handleSubmit(event) {
    event.preventDefault();
    const routePath = AppRoutes.search;
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
          <Grid container spacing={2}>
            <Grid item>
              <Typography component={Link} to={AppRoutes.home} style={{textDecoration: 'none'}}
                          className={classes.menuButton}
                          variant="h6"
                          color="inherit" noWrap>
                General Information Graph
              </Typography>
              <IconButton component={Link} to={AppRoutes.graph} color="secondary" aria-label="view-graph">
                <BubbleChartIcon sx={{fontSize:'3rem'}} />
              </IconButton>
            </Grid>
            <Grid item sm={8}>
              <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off" style={{display: 'flex', marginTop:'12px'}}>
                <div className={classes.search} style={{width: '100%'}}>
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
                </div>
                <Button variant="contained" color="primary" type="submit" style={{borderRadius: '20px'}}>
                  Search
                </Button>
              </form>
            </Grid>
            <Grid item sx={{marginTop: 1}}>
              <BeatLoader
                css={override}
                sizeUnit={"px"}
                size={14}
                color={'#36D7B7'}
                loading={isLoading}
              />
            </Grid>
            <Grid item sx={{flexGrow: 1}}/>
            <Grid item sx={{marginTop: 2.5}}>
              {user ?
                <Link to={'#'} onClick={() => logout(setUser)} className={classes.loginButton}>{user} -
                  Logout</Link> :
                <Link to={AppRoutes.login} className={classes.loginButton}>Login</Link>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet/>
    </div>
  )
}

export default withStyles(Styles)(Header);
