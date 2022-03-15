import React, {useEffect, useState} from 'react';
import InputBase from "@mui/material/InputBase/InputBase";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import {withStyles} from "@mui/styles";
import CountUp from 'react-countup';
import Chip from '@mui/material/Chip';
import Styles, {counterProps} from "./Styles";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Home.css'
import {logout} from "../../auth/User";
import {getGraphStats} from "../../functions/api/GetStats";
import {AppRoutes} from "../../routes";
import {AppPreferences} from "../../preferences";

function Home(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const {classes, user, setIsLoading, setUser, searchKey, setSearchKey} = props;
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
        {user ?
          <Link to={'#'} onClick={() => logout(setUser)} className={classes.loginButton}>{user} -
            Logout</Link> :
          <Link to={AppRoutes.login} className={classes.loginButton}>Login</Link>
        }
        <Link to={AppRoutes.graph} style={{textDecoration: "none"}}>
          <Button variant="outlined" color="secondary" type="button" style={{borderRadius: "25px"}}>
            View Graph
          </Button>
        </Link>
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className={classes.search} style={{margin: '20px'}}>
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
          </div>
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
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


            <div>
              <Typography>Categories:</Typography>
              {Array.isArray(stat.category_wise_count) ?
                stat.category_wise_count.map((category) => (
                  <Chip key={"chip_" + category._id} color="primary" variant="outlined"
                        component="a" href={AppRoutes.search + category._id + ":"} clickable
                        label={<CountUp {...counterProps} prefix={category._id + ": "}
                                        end={category.category_count}/>}/>
                )) : null}
            </div>

            <div>
              <Typography>Exclusive Category Groupings:</Typography>
              {Array.isArray(stat.category_group_wise_count) ?
                stat.category_group_wise_count.map((category_group) => (
                  <Chip key={"chip_" + category_group._id} color="secondary"
                        variant="outlined"
                        component="a" href={AppRoutes.search + category_group._id.join() + ":"} clickable
                        label={<CountUp {...counterProps} prefix={category_group._id.join() + ": "}
                                        end={category_group.category_count}/>}/>
                )) : null}
            </div>

          </div>
          : null}
      </div>
    </header>)
}

export default withStyles(Styles)(Home);
