import React, {Component, useState} from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {Link, useParams} from 'react-router-dom'
import Avatar from "@mui/material/Avatar/Avatar";
import Grid from "@mui/material/Grid/Grid";
import {Styles} from "./Styles";
import {getResults} from "../../functions/api/GetQueries";
import InfiniteList from "../infinite_list/InfiniteList";
import MainContentList from "../main_content/MainContentList";


function SearchResults(props) {

  const {searchParam} = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const [searchState, setSearchState] = useState("");
  const {classes, setIsLoading} = props;

  async function getSearchResults(initialSearch) {
    if (searchParam.length > 1) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
      if (searchParam.includes(":")) {
        let searchArray = searchParam.split(":", 2);
        searchUrl += searchArray[1] + '&categories=' + searchArray[0];
      } else {
        searchUrl += searchParam;
      }
      let result = await getResults(searchUrl, initialSearch, searchResults, searchPage, setSearchResults, setSearchPage, 15);
      setIsLoading(false);
      return result
    }
    return false
  }
  if (searchParam !== searchState) {
    console.log("loading search results:", searchParam);
    getSearchResults(true);
    setSearchState(searchParam);
  }

  return (
    <Grid className={classes.container} container width={1}>
      <Grid item xs={3} className={classes.leftContentColumn}></Grid>
      <Grid item xs={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={searchResults}
                      getResultItems={getSearchResults}
                      list={<MainContentList listItems={searchResults}/>}
        />
      </Grid>

    </Grid>
  )
    ;
}

export default withStyles(Styles)(SearchResults);
