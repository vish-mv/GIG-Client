import React, {Component} from "react";
import Grid from "@mui/material/Grid/Grid";
import RelatedLinkItem from "./RelatedLinkItem";
import Typography from "@mui/material/Typography/Typography";
import Avatar from "@mui/material/Avatar/Avatar";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import {Link} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../shared/header/Styles";

class RelatedLinkList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.setState({open: !this.state.open});
  }

  render() {
    const {classes, links} = this.props;

    let viewSet = links.slice(0, 5);
    let hiddenSet = links.slice(5);

    return (
      <Grid container width={1} spacing={2}>
        {Array.isArray(viewSet) ?
          viewSet.map((link) => (
            <RelatedLinkItem key={link.title} title={link.title} url={link.title + "?date=" + link.dates[0]}/>
          ))
          :
          <Typography component="p">
            No Results Found
          </Typography>
        }
        {!this.state.open && hiddenSet.length > 0 ?
          <Grid item>
            <Tooltip title={hiddenSet.length + " more"} aria-label="add">
              <Link className={classes.link} to="#">
                <Avatar alt="view more" src="plus.jpg" onClick={this.handleClick}/>
              </Link>
            </Tooltip>
          </Grid>
          : null
        }

        {Array.isArray(hiddenSet) && this.state.open ?
          hiddenSet.map((link) => (
            <RelatedLinkItem key={link.title} title={link.title} url={link.title + "?date=" + link.dates[0]}/>
          ))
          : null
        }
      </Grid>
    )
  }
}

export default withStyles(Styles)(RelatedLinkList);
