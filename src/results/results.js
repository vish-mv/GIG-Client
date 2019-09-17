import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
  searchResult: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: 'black',
    textAlign: 'left',
    margin: '10px',
    cursor: 'pointer',
  },
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
  },
  link: {
    paddingRight: '10px'
  }
});

class SearchResults extends Component {

  componentDidMount() {
    this.props.handleChange("searchKey", this.props.match.params.searchKey);
    this.props.getSearchResults(this.props.match.params.searchKey);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.searchKey !== this.props.match.params.searchKey) {
      this.props.getSearchResults(this.props.match.params.searchKey);
    }
  }

  render() {
    const {classes, searchResults} = this.props;
    return (

      <div className="content">

        <div className={classes.container}>
          {Array.isArray(searchResults) ?
            searchResults.map((entity) => (
              <Paper key={entity.title} className={classes.searchResult} elevation={1}>
                <Link to={'/content/' + entity.title} style={{textDecoration: 'none'}}>
                  <Grid container width={1} spacing={8}>
                    <Grid item>
                      <Avatar alt={entity.title} src={entity.image_url}/>
                    </Grid>
                    <Grid item md={11}>
                      <Typography variant="h5" component="h3">
                        {entity.title}
                      </Typography>
                      <Typography component="p">
                        {entity.snippet}
                      </Typography>
                    </Grid>
                  </Grid>
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
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchResults);
