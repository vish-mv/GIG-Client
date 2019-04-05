import React, {Component} from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'

const styles = theme => ({
  appBar: {
    backgroundColor: '#282c34'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  searchResult: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: 'black',
    textAlign: 'left',
    margin: '10px',
    cursor: 'pointer',
  },
});

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: this.props.match.params.searchKey,
      searchResults: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getSearchResults(searchKey) {
    if (searchKey.length > 3) {
      fetch(process.env.REACT_APP_SERVER_URL + 'api/search?for=' + searchKey, {
        method: 'GET'
      }).then(results => {
        return results.json();
      }).then(data => {
        this.setState({searchResults: data});
      });
    }
  }

  componentDidMount() {
    this.getSearchResults(this.state.searchKey);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/search/' + this.state.searchKey);
    this.getSearchResults(this.state.searchKey);
  }

  handleChange(e) {
    this.setState({
      searchKey: e.target.value
    });
  }

  render() {
    const {classes} = this.props;
    const {searchResults, searchKey} = this.state;
    return (

      <div className="content">
        <AppBar position="static">
          <Toolbar className={classes.appBar}>
            <Typography component={Link} to="/" style={{ textDecoration: 'none' }} className={classes.menuButton} variant="h6"
                        color="inherit" noWrap>
              General Information Graph
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <form id="search-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <InputBase
                  name="search"
                  placeholder="Search…"
                  value={searchKey}
                  onChange={this.handleChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            </div>
            <div className={classes.grow}/>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>
          {searchResults
            ? searchResults.map((entity) => (
              <Link to={'/content/' + entity.title + '/' + entity.id} style={{ textDecoration: 'none' }}>
              <Paper className={classes.searchResult} key={entity.id} elevation={1}>
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
