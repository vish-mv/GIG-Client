import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import FormattedContent from "./FormattedContent";

const styles = theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
  },
  editButton: {
    fontSize: 14,
    textAlign: "right",
    margin: 10,
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

class ViewEntity extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title + this.props.location.search);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title + this.props.location.search);
    }
  }

  render() {
    const {classes, loadedEntity} = this.props;
    return (
      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            {loadedEntity ?
              <div>
                <Typography variant="h4" component="h4">
                  {loadedEntity.title}
                </Typography><Link to={'/edit/'+loadedEntity.title} className={classes.editButton}>Edit</Link><br/>
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

ViewEntity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewEntity);
