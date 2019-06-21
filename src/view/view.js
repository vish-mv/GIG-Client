import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import FormattedContent from "./formattedContent";

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

class ViewResult extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title);
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
                </Typography><br/>
                  <table>
                    <tbody>
                    {loadedEntity.attributes ? loadedEntity.attributes.map((attribute) => (
                      <FormattedContent key={attribute.name} content={attribute}/>
                    )) : null}
                    </tbody>
                  </table>
                <br/>
                <Typography component="p">
                  Links:
                  {loadedEntity.loaded_links ? loadedEntity.loaded_links.map((entity) => (
                    <Link className={classes.link} key={entity.title} to={'/content/' + entity.title}>
                      {entity.title}
                    </Link>
                  )) : null}
                </Typography>
                <br/>
                <Typography component="p">
                  Categories:
                  {loadedEntity.categories ? loadedEntity.categories.map((title) => (
                    <Link className={classes.link} key={loadedEntity.title+title} to={'/search/' + title+':'}>
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

ViewResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewResult);
