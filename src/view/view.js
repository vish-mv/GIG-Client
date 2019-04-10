import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
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

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {classes, loadedEntity} = this.props;
    return (

      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            <Typography variant="h5" component="h3">
              {loadedEntity.title}
            </Typography>
            <Typography component="p">
              {loadedEntity.content}
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
