import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tree from 'react-tree-graph';
import './tree.css'

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

class TreeView extends Component {

  componentDidMount() {
    this.props.handleChange("searchKey", this.props.match.params.searchKey);
    this.props.getSearchResults("OrgChart:");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.searchKey !== this.props.match.params.searchKey) {
      this.props.getSearchResults("OrgChart:");
    }
  }

  render() {
    const {classes, searchResults} = this.props;

    let data={
      name: 'Organization Chart',
      children: searchResults.map((entity)=>{return {
        name:entity.title,
        children: entity.links.map((link)=>{return{
          name:link
        }})
      }})
    };

    return (
      <div className="content">
        <div className="custom-container">
          <Paper className={classes.searchResult} elevation={1}>
            <Typography variant="h4" component="h4">
              Organization Chart
            </Typography>
            <div className="custom-container">
              <Tree
                data={data}
                height={800}
                width={1500}
                svgProps={{
                  className: 'custom'
                }}
                margins={{ bottom : 10, left : 20, right : 350, top : 10}}
                animated
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

TreeView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TreeView);
