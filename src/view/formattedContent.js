import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

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
  },
  paragraph: {
    margin: '15px 0'
  },
  link: {
    paddingRight: '10px'
  }
});

class FormattedContent extends Component {

  render() {
    const {classes, content} = this.props;
    return (
      <div>
        {content ? content.split('\n').map((item, i) => {
          if ((item.match(/=/g) || []).length === 4) {
            return <Typography variant="h5" component="h5" key={i}>{item.replace(/=/g, '')}</Typography>
          } else if ((item.match(/=/g) || []).length === 6) {
            return <Typography variant="h6" component="h6" key={i}>{item.replace(/=/g, '')}</Typography>
          } else {
            return <Typography component="p" className={classes.paragraph} key={i}>{item.replace(/=/g, '')}</Typography>
          }
        }) : null}
      </div>
    );
  }
}

FormattedContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormattedContent);
