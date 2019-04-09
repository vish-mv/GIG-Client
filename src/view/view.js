import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

class ViewResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resultId: this.props.match.params.id,
      result: []
    };
  }

  getResult(id) {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + id, {
      method: 'GET'
    }).then(results => {
      return results.json();
    }).then(data => {
      this.setState({result: data});
    });
  }

  componentDidMount() {
    this.getResult(this.state.resultId);
  }

  render() {
    const {classes} = this.props;
    const {result} = this.state;
    return (

      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            <Typography variant="h5" component="h3">
              {result.title}
            </Typography>
            <Typography component="p">
              {result.content}
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

ViewResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewResult);
