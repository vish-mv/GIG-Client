import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {useNavigate, useParams} from 'react-router-dom';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Button from "@mui/material/Button/Button";
import {getEntity} from "../../gig-client-shared/functions/api/getQueries";
import {Styles} from "./Styles";
import {saveEntity} from "../../gig-client-shared/functions/api/saveEntity";
import {deleteEntity} from "../../gig-client-shared/functions/api/deleteEntity";

function EditEntity(props) {

  const navigate = useNavigate();
  const {titleParam} = useParams();
  const {classes, user} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [modifiedEntity, setModifiedEntity] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

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
    setModifiedEntity(data);
  }

  return (
    <div className="content">
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={1}>
          {modifiedEntity ?
            <div>
              <JSONInput
                id='entity_editor'
                placeholder={modifiedEntity}
                locale={locale}
                height
                width
                onChange={(e) => {
                  setModifiedEntity(e);
                  setIsChanged(true)
                }}
              />
              <Button disabled={!isChanged} variant="contained" color="primary" type="button"
                      onClick={() => saveEntity(loadedEntity, modifiedEntity, navigate)}>
                Save
              </Button>
              <Button variant="contained" color="error" type="button"
                      onClick={() => deleteEntity(loadedEntity, navigate)}>
                Delete
              </Button>
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

export default withStyles(Styles)(EditEntity);
