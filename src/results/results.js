import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'

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
});

class SearchResults extends Component {

  componentDidMount() {
    this.props.handleChange("searchKey", this.props.match.params.searchKey);
    this.props.getSearchResults(this.props.match.params.searchKey);
  }

  render() {
    const {classes, searchResults} = this.props;
    return (

      <div className="content">

        <div className={classes.container}>
          {searchResults
            ? searchResults.map((entity) => (
              <Link key={entity.title}  to={'/content/' + entity.title} style={{textDecoration: 'none'}}>
                <Paper className={classes.searchResult} elevation={1}>
                  <Typography variant="h5" component="h3">
                    {entity.title}
                  </Typography>
                  <Typography component="p">
                    {entity.content}
                  </Typography>
                </Paper>
              </Link>
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
