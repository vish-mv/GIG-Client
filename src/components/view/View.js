import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {Link, useParams} from "react-router-dom";
import FormattedContent from "./FormattedContent";
import {Styles} from "./Styles";
import {getEntity} from "../../functions/api/GetQueries";
import {userIsAuthorized} from "../../auth/Authentication";

function ViewEntity(props) {
  const {titleParam} = useParams();
  const {classes} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const isAuthorized = userIsAuthorized();

  async function updateEntityState(data) {
    setLoadedEntity(data);
  }

  useEffect(() => {
    if (!loadedEntity || loadedEntity.title !== titleParam) {
      console.log("get profile entity:", titleParam);
      getEntity(titleParam, updateEntityState);
    }

  });

  return (
    <div className="content">
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={6}>
          {loadedEntity ?
            <div>
              <Typography variant="h4" component="h4">
                {loadedEntity.title}
              </Typography>
              {isAuthorized ?
                <Link to={'/edit/' + loadedEntity.title} className={classes.editButton}>Edit</Link> : null}
              <br/>
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

export default withStyles(Styles)(ViewEntity);
