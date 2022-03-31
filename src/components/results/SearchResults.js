import React, {useEffect, useState} from "react";
import {withStyles} from '@mui/styles';
import {useParams} from 'react-router-dom'
import Grid from "@mui/material/Grid/Grid";
import {Styles} from "./Styles";
import {getGraphStats, getResults} from "@lsflk/gig-client-shared/functions";
import {InfiniteList, MainContentList} from "@lsflk/gig-client-shared/components";
import {AppRoutes} from "../../routes";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider/Divider";
import Box from "@mui/material/Box/Box";
import "./Search.css";
import Typography from "@mui/material/Typography";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes";


function SearchResults(props) {

  const {searchParam} = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [searchState, setSearchState] = useState("");
  const {classes, setIsLoading} = props;
  const [stat, setStat] = useState(null);

  function getStats() {
    getGraphStats().then((categoryData) => {
      if (categoryData) {
        setStat(categoryData.payload)
      }
    });
  }

  useEffect(() => {
    if (!stat) {
      getStats()
    }
  }, [stat]);

  function getSearchResults(page = 1) {
    if (searchParam.length > 1) {
      getResults(searchParam, ApiRoutes.search, page).then((data) => {
        if (data === null && page === 1) {
          setSearchResults([]);
          setSearchPage(1)
        }
        else if (page === 1 || !searchResults) {
          setSearchResults(data);
          setSearchPage(2)
        } else {
          setSearchResults([...searchResults, ...data]);
          setSearchPage(searchPage + 1);
        }
        setIsLoading(false);
      })
    }
  }

  if (searchParam !== searchState) {
    setSearchState(searchParam);
    console.log("loading search results:", searchParam);
    getSearchResults();
  }

  return (
    <Grid className={classes.container} container width={1} style={{paddingLeft: 0}}>
      <Grid item sm={0} lg={3} className={classes.leftContentColumn}>
        <Box id="category-drawer" role="presentation">
          <List>
            <ListItem style={{borderRadius: '0 25px 25px 0'}} button key="Categories">
              <ListItemText disableTypography
                            primary={<Typography variant="h5">Categories</Typography>}/>
            </ListItem>
          </List>
          <Divider/>
          <List>
            {stat?.category_wise_count?.map((item) => (
              <ListItem style={{borderRadius: '0 25px 25px 0'}} button key={item._id}
                        component="a" href={AppRoutes.search + item._id + ":"}>
                <ListItemText disableTypography
                              primary={<Typography style={{color: 'rgba(60,64,67,0.9)'}}>{item._id}</Typography>}/>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item lg={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={searchResults}
                      getResultItems={() => getSearchResults(searchPage)}
                      list={<MainContentList
                        elevation={3}
                        listItems={searchResults}
                        entityRoute={AppRoutes.entity}
                        searchRoute={AppRoutes.search}
                      />}
        />
      </Grid>
    </Grid>
  )
    ;
}

export default withStyles(Styles)(SearchResults);
