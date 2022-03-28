import React, {useEffect, useState} from 'react';
import InputBase from "@mui/material/InputBase/InputBase";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import BeatLoader from 'react-spinners/BeatLoader';
import Styles, {override} from "../Styles";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import './Header.css'
import Button from "@mui/material/Button/Button";
import Grid from '@mui/material/Grid';
import {AppRoutes} from "../../../routes";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import IconButton from "@mui/material/IconButton/IconButton";
import {AppPreferences} from "../../../preferences";
import UserInfo from "../user-info/UserInfo";
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [initialLoad, setInitialLoad] = useState(true);

  const {classes, isLoading, setIsLoading, searchKey, setSearchKey} = props;

  function handleSubmit(event) {
    event.preventDefault();
    const routePath = AppRoutes.search;
    const url = routePath + encodeURI(searchKey);
    if (searchKey.length > AppPreferences.minimumSearchKeyLength && url !== location.pathname) {
      setIsLoading(true);
      navigate(url);
    }
  }

  useEffect(() => {
    if (initialLoad && params?.searchParam && searchKey === "") {
      setSearchKey(params.searchParam);
      setInitialLoad(false);
    }
  }, [initialLoad, params?.searchParam, searchKey, setInitialLoad, setSearchKey]);

  return (
    <div>
      <AppBar position="static" style={{position: 'fixed', zIndex: 1000}}>
        <Toolbar className={classes.appBar}>
          <Grid container>
            <Grid item sx={{marginTop: 1}}>
              <Typography component={Link} to={AppRoutes.home} sx={{textDecoration: 'none', fontSize: 30}}
                          className={classes.menuButton}
                          variant="h6"
                          color="inherit" noWrap>
                GIG
              </Typography>
            </Grid>
            <Grid item>
              <IconButton component={Link} to={AppRoutes.graph} color="secondary" aria-label="view-graph">
                <BubbleChartIcon sx={{fontSize: '3rem'}}/>
              </IconButton>
            </Grid>
            <Grid item sm={6} xs={12}>
              <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off"
                    style={{display: 'flex', marginTop: '12px'}}>
                <div className={classes.search} style={{width: '100%'}}>
                  <IconButton sx={{p: '5px'}} aria-label="search">
                    <SearchIcon/>
                  </IconButton>
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
            <Grid item>
              <div style={{marginTop: '20px'}}>
                <BeatLoader
                  css={override}
                  sizeUnit={"px"}
                  size={14}
                  color={'#36D7B7'}
                  loading={isLoading}
                />
              </div>
            </Grid>
            <Grid item sx={{flexGrow: 1}}/>
            <Grid item sx={{marginTop: 3, marginBottom: 3}}>
              <UserInfo {...props} color="white"/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div style={{paddingTop: 64}}>
        <Outlet/>
      </div>
    </div>
  )
}

export default withStyles(Styles)(Header);
