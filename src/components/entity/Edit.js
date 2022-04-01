import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {useParams} from 'react-router-dom';
import {getEntity} from "@lsflk/gig-client-shared/functions";
import {Styles} from "./Styles";
import {Facebook} from 'react-content-loader';
import Box from "@mui/material/Box/Box";
import TabPanel from "./edit-tools/TabPanel"
import EditUI from "./edit-tools/EditUI"
import {JsonEditor as Editor} from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ToolBar from "./edit-tools/ToolBar";

function EditEntity(props) {

  const {titleParam} = useParams();
  const {classes, user} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [modifiedEntity, setModifiedEntity] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  function updateEditedEntity(entity) {
    setModifiedEntity(entity);
    if (!isModified) {
      setIsModified(true)
    }
  }

  useEffect(() => {
    if (user) {
      if (!loadedEntity || (loadedEntity.title !== titleParam)) {
        console.log("get profile entity:", titleParam);
        getEntity(titleParam).then(entity => {
          setLoadedEntity(entity);
          setModifiedEntity(entity);
        });
      }
    }
  });

  return (
    <div className="content">
      {loadedEntity && <ToolBar
        isModified={isModified}
        loadedEntity={loadedEntity}
        modifiedEntity={modifiedEntity}
        tabValue={tabValue}
        handleChange={handleChange}
        setIsModified={setIsModified}
      />}
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={6}>
          {modifiedEntity ?
            <div>
              <Box sx={{width: '100%'}}>
                <TabPanel value={tabValue} index={0}>
                  <EditUI entity={modifiedEntity} setEntity={updateEditedEntity}/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Editor
                    value={modifiedEntity}
                    onChange={(e) => {
                      updateEditedEntity(e.target.value)
                    }}
                  />
                </TabPanel>
              </Box>
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
