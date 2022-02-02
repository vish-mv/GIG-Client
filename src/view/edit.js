import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import FormattedContent from "./formattedContent";
import { Redirect } from 'react-router-dom';

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

class EditEntity extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title + this.props.location.search);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title + this.props.location.search);
    }
  }

  render() {
    const {classes, loadedEntity, user} = this.props;
    if (!user) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login?redirect='+loadedEntity.title, state: { from: this.props.location } }} />
    }
    return (
      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            {loadedEntity ?
              <div>
                <Typography variant="h4" component="h4">
                  {loadedEntity.title}
                </Typography><br/>
                <table>
                  <tbody>
                  {loadedEntity.attributes ? Object.entries(loadedEntity.attributes).map((attribute) => (
                    <FormattedContent key={attribute[1].name} content={attribute[1]}/>
                  )) : null}
                  </tbody>
                </table>
                <br/>
                <Typography component="p">
                  Links:
                  {loadedEntity.links ? loadedEntity.links.map((link) => (
                    <Link className={classes.link} key={link.title}
                          to={'/content/' + link.title + "?date=" + link.dates[0]}>
                      {link.title}
                    </Link>
                  )) : null}
                </Typography>
                <br/>
                <Typography component="p">
                  Categories:
                  {loadedEntity.categories ? loadedEntity.categories.map((title) => (
                    <Link className={classes.link} key={loadedEntity.title + title} to={'/search/' + title + ':'}>
                      {title}
                    </Link>
                  )) : null}
                </Typography>
              </div>
              :
              <Typography component="p">
                Document not found
              </Typography>
            }
          </Paper>
        </div>
      </div>
    );
  }
}

EditEntity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditEntity);
