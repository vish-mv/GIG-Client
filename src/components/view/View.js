import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {Link, useParams} from "react-router-dom";
import FormattedContent from "@lsflk/gig-client-shared/components/formatted-content-viewer/FormattedContentViewer";
import {Styles} from "./Styles";
import {getEntity} from "@lsflk/gig-client-shared/functions/api/getQueries";
import {userIsEditAuthorized} from "@lsflk/gig-client-shared/auth/Authentication";
import {AppRoutes} from "../../routes";

function ViewEntity(props) {
  const {titleParam} = useParams();
  const {classes} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const isAuthorized = userIsEditAuthorized();

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
              {isAuthorized &&
              <Link to={AppRoutes.edit + loadedEntity.title} className={classes.editButton}>Edit</Link>}
              <br/>
              <table>
                <tbody>
                {Object.entries(loadedEntity?.attributes).map((attribute) => (
                  <FormattedContent key={attribute[1].name} content={attribute[1]}/>
                ))}
                </tbody>
              </table>
              <br/>
              <Typography component="p">
                Links:
                {loadedEntity?.links?.map((link) => (
                  <Link className={classes.link} key={link.title}
                        to={AppRoutes.entity + link.title + "?date=" + link.dates[0]}>
                    {link.title}
                  </Link>
                ))}
              </Typography>
              <br/>
              <Typography component="p">
                Categories:
                {loadedEntity?.categories?.map((title) => (
                  <Link className={classes.link} key={loadedEntity.title + title} to={AppRoutes.search + title + ':'}>
                    {title}
                  </Link>
                ))}
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
