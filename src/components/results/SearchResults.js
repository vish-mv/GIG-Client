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


function SearchResults(props) {

  const {searchParam} = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const {classes, setIsLoading,searchKey, setSearchKey} = props;

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

  if (searchParam !== searchKey) {
    console.log("loading search results:", searchParam);
    getSearchResults(true);
    setSearchKey(searchParam);
  }

  return (
    <div className="content">

      <div className={classes.container}>
        {Array.isArray(searchResults) ?
          searchResults.map((entity) => (
            <Paper key={entity.title} elevation={6} className={classes.searchResult}>
              <Link to={'/content/' + entity.title} style={{textDecoration: 'none'}}>
                {/*<Grid container width={1} spacing={8}>*/}
                  {/*<Grid item>*/}
                    {/*<Avatar alt={entity.title} src={entity.image_url}/>*/}
                  {/*</Grid>*/}
                  {/*<Grid item md={11}>*/}
                    {/*<Typography variant="h5" component="h3">*/}
                      {/*{entity.title}*/}
                    {/*</Typography>*/}
                    {/*<Typography component="p">*/}
                      {/*{entity.snippet.substring(0, 500) + "..."}*/}
                    {/*</Typography>*/}
                  {/*</Grid>*/}
                {/*</Grid>*/}
              </Link>
              <Grid container width={1} spacing={8}>
                <Grid item>
                </Grid>
                <Grid item md={11}>
                  <Typography component="p">
                    {entity.categories ? entity.categories.map((title) => (
                      <Link className={classes.link} key={entity.title + title} to={'/search/' + title + ':'}>
                        {title}
                      </Link>
                    )) : null}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))
          :
          <Paper className={classes.searchResult} elevation={1}>
            <Typography component="p">
              No Results Found
            </Typography>
          </Paper>
        }

      </div>
    </div>
  )
    ;
}

export default withStyles(Styles)(SearchResults);
