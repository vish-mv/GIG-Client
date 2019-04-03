import React, {Component} from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

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
    backgroundColor: 'white'
  },
  searchResult:{
    color: 'black',
    textAlign: 'left'
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
});

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSearchResults(searchKey) {
    if (searchKey.length > 3) {
      fetch('http://localhost:9000/api/search?for=' + searchKey, {
        method: 'GET'
      }).then(results => {
        return results.json();
      }).then(data => {
        this.setState({searchResults: data});
      });
    }
  }

  componentDidMount() {
    this.getSearchResults(this.props.search);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getSearchResults(this.props.search)
  }

  render() {
    const {classes} = this.props;
    const {searchResults} = this.state;
    return (

      <div className="content">
        <AppBar position="static">
          <Toolbar className={classes.appBar}>
            <Typography className={classes.menuButton} variant="h6" color="inherit" noWrap>
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
                  value={this.props.search}
                  onChange={this.props.handleChange()}
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
            ? searchResults.map((otherEntity) => (
              <div className={classes.searchResult} key={otherEntity.id}>
                {otherEntity.title}
              </div>
            ))
            : null}
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
