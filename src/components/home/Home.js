import React, {useEffect, useState} from 'react';
import InputBase from "@mui/material/InputBase/InputBase";
import Button from "@mui/material/Button/Button";
import {withStyles} from "@mui/styles";
import CountUp from 'react-countup';
import Chip from '@mui/material/Chip';
import Styles, {counterProps} from "./Styles";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Home.css'
import {getGraphStats} from "@lsflk/gig-client-shared/functions";
import {AppRoutes} from "../../routes";
import {AppPreferences} from "../../preferences";
import UserInfo from "../shared/user-info/UserInfo";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton/IconButton";
import Tooltip from '@mui/material/Tooltip';
import Grid from "@mui/material/Grid/Grid";

function Home(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const {classes, setIsLoading, searchKey, setSearchKey} = props;
  const [stat, setStat] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const routePath = AppRoutes.search;
    const url = routePath + encodeURI(searchKey);
    if (searchKey.length > AppPreferences.minimumSearchKeyLength && url !== location.pathname) {
      setIsLoading(true);
      navigate(url);
    }
  }

  async function getStats() {
    const graphData = await getGraphStats();
    if (graphData) {
      setStat(graphData.payload)
    }
  }

  useEffect(() => {
    if (!stat) {
      getStats().then(() => console.log("graph stats loading success."));
    }
  }, [stat]);

  return (
    <header className="App-header">
      <div className="content">
        <div style={{position: "absolute", top: '12px', right: '15px'}}>
          <UserInfo {...props} color="rgba(0,0,0,.87)"/><br/>
        </div>
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <Grid container>
          <Grid item sx={{flexGrow: 1}}/>
          <Grid item xs={12} lg={4}>
            <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={classes.search} style={{margin: '20px'}}>
                <IconButton sx={{p: '5px'}} aria-label="search">
                  <SearchIcon/>
                </IconButton>
                <InputBase
                  id="search-input"
                  name="search"
                  placeholder="Search…"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
                {searchKey ?
                <IconButton sx={{p: '5px'}} aria-label="search" onClick={() => setSearchKey("")}>
                  <CloseIcon/>
                </IconButton>:
                  <IconButton sx={{p: '5px'}} aria-label="search">
                  </IconButton>
                }
              </div>
              <Tooltip title="Search">
                <Button variant="contained" color="primary" type="submit" tooltip="Search">
                  Search
                </Button>
              </Tooltip>
            </form>
          </Grid>
          <Grid item sx={{flexGrow: 1}}/>
        </Grid>
        {stat ?
          <div style={{paddingTop: 20}}>
            <Chip color="primary" clickable
                  label={<CountUp {...counterProps} prefix={"Total Entities: "}
                                  end={stat.entity_count}/>}/>
            <Chip color="primary" clickable
                  label={<CountUp {...counterProps} prefix={"Total Relations: "}
                                  end={stat.relation_count}/>}/>
            <Chip color="primary" clickable
                  label={<CountUp {...counterProps} prefix={"Total Categories: "}
                                  end={stat.category_wise_count.length}/>}/>


            {/*<div>*/}
            {/*<Typography>Categories:</Typography>*/}
            {/*{stat?.category_wise_count?.map((category) => (*/}
            {/*<Chip key={"chip_" + category._id} color="primary" variant="outlined"*/}
            {/*component="a" href={AppRoutes.search + category._id + ":"} clickable*/}
            {/*label={<CountUp {...counterProps} prefix={category._id + ": "}*/}
            {/*end={category.category_count}/>}/>*/}
            {/*))}*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*<Typography>Exclusive Category Groupings:</Typography>*/}
            {/*{stat?.category_group_wise_count?.map((category_group) => (*/}
            {/*<Chip key={"chip_" + category_group._id} color="secondary"*/}
            {/*variant="outlined"*/}
            {/*component="a" href={AppRoutes.search + category_group._id.join() + ":"} clickable*/}
            {/*label={<CountUp {...counterProps} prefix={category_group._id.join() + ": "}*/}
            {/*end={category_group.category_count}/>}/>*/}
            {/*))}*/}
            {/*</div>*/}

          </div>
          : null}
        <Link to={AppRoutes.graph} style={{textDecoration: "none"}}>
          <Button variant="contained" color="secondary" type="button" style={{borderRadius: 25, marginTop: 10}}>
            View Graph
          </Button>
        </Link>
      </div>
    </header>)
}

export default withStyles(Styles)(Home);
