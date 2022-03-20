import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import Styles from "./Styles"
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar/Avatar";
import Grid from "@mui/material/Grid/Grid";
import Tooltip from '@mui/material/Tooltip';
import {Routes} from "../../../routes";

class RelatedLinkItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "avatar.png"
    };
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    const {title} = this.props;
    this.getImage(title);
  }

  getImage(title) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + "api/get/" + title + "?imageOnly=true";
    fetch(searchUrl, {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json()
      }
    }).then(url => {
      if (url !== "") {
        this.setState({imageUrl: url ? url : "avatar.png"})
      }
    });
  }

  render() {
    const {classes, title, url} = this.props;
    const {imageUrl} = this.state;
    return (
      <Grid item>
        <Tooltip title={title} aria-label="add">
          <Link className={classes.link} to={Routes.entity + url}>
            <Avatar alt={title} src={imageUrl}/>
          </Link>
        </Tooltip>
      </Grid>
    )
  }
}

export default withStyles(Styles)(RelatedLinkItem);
