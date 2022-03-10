import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import {Typography} from "@mui/material";
import Styles from "../shared/header/Styles"
import List from "@mui/material/List/List";
import MainContentItem from "./MainContentItem";
import Moment from 'moment';

class MainContentList extends Component {

  render() {
    const {classes, listItems, vertical} = this.props;
    return (
      <List className={classes.listContainer}>
        {Array.isArray(listItems) ?
          listItems.map((entity) => (
            <MainContentItem key={entity.title}
                             imageUrl={entity.image_url} title={entity.title}
                             subtitle={entity.source_date !== "0001-01-01T00:00:00Z" ?
                               Moment(entity.source_date).format('DD  MMM YYYY h:mm A') :
                               Moment(entity.updated_at).format('DD  MMM YYYY h:mm A')}
                             description={entity.snippet}
                             links={entity.links.slice(0, 20)}
                             categories={entity.categories}
                             vertical={vertical}
            />
          ))
          :
          <Typography component="p" style={{textAlign: 'center'}}>
            No Results Found
          </Typography>
        }
      </List>
    )
  }
}

export default withStyles(Styles)(MainContentList);
