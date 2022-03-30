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
import "./Search.css"
import Typography from "@mui/material/Typography"


function SearchResults(props) {

  const {searchParam} = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const [searchState, setSearchState] = useState("");
  const {classes, setIsLoading} = props;
  const [stat, setStat] = useState(null);

  async function getStats() {
    const categoryData = await getGraphStats();
    if (categoryData) {
      setStat(categoryData.payload)
    }
  }

  useEffect(() => {
    if (!stat) {
      getStats().then(() => console.log("category data loading success."));
    }
  }, [stat]);

  async function getSearchResults(initialSearch) {
    if (searchParam.length > 1) {
      let result = await getResults(searchParam, initialSearch, searchResults, searchPage, setSearchResults, setSearchPage, 15);
      setIsLoading(false);
      return result
    }
    return false
  }

  if (searchParam !== searchState) {
    console.log("loading search results:", searchParam);
    getSearchResults(true).then(setSearchState(searchParam));
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
                      getResultItems={getSearchResults}
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
