import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {useNavigate, useParams} from 'react-router-dom';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Button from "@mui/material/Button/Button";
import {deleteEntity, getEntity, updateEntity} from "@lsflk/gig-client-shared/functions";
import {Styles} from "./Styles";
import {Facebook} from 'react-content-loader';

function EditEntity(props) {

  const navigate = useNavigate();
  const {titleParam} = useParams();
  const {classes, user} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [modifiedEntity, setModifiedEntity] = useState(null);

  useEffect(() => {
    if (user) {
      if (!loadedEntity || (loadedEntity.title !== titleParam)) {
        console.log("get profile entity:", titleParam);
        getEntity(titleParam, updateEntityState);
      }
    }
  });

  async function updateEntityState(data) {
    setLoadedEntity(data);
  }

  return (
    <div className="content">
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={1}>
          {loadedEntity ?
            <div>
              <JSONInput
                id='entity_editor'
                placeholder={loadedEntity}
                locale={locale}
                height
                width
                onChange={(e) => {
                  setModifiedEntity(e);
                }}
              />
              <Button variant="contained" color="primary" type="button"
                      onClick={() => updateEntity(loadedEntity, modifiedEntity['jsObject'], navigate)}>
                Save
              </Button>
              <Button variant="contained" color="error" type="button"
                      onClick={() => deleteEntity(loadedEntity, navigate)}>
                Delete
              </Button>
            </div>
            :
            <Typography component="p">
              <Facebook/>
            </Typography>
          }
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(Styles)(EditEntity);
