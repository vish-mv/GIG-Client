import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {useNavigate, useParams} from 'react-router-dom';
import Button from "@mui/material/Button/Button";
import {deleteEntity, getEntity, updateEntity} from "@lsflk/gig-client-shared/functions";
import {Styles} from "./Styles";
import {Facebook} from 'react-content-loader';
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box/Box";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import TabPanel from "./edit-tools/EditTabPanel"
import EditUI from "./edit-tools/EditUI"
import {JsonEditor as Editor} from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import {AppRoutes} from "../../routes";

function EditEntity(props) {

  const navigate = useNavigate();
  const {titleParam} = useParams();
  const {classes, user} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [modifiedEntity, setModifiedEntity] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={1}>
          {modifiedEntity ?
            <div>
              <Grid container>
                <Grid item lg={12} style={{textAlign:'right'}}>
                  <Button component="a" href={AppRoutes.entity + loadedEntity.title} variant="outlined">View</Button>
                </Grid>
              </Grid>
              <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                  <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Edit UI" {...a11yProps(0)} />
                    <Tab label="JSON Editor" {...a11yProps(1)} />
                  </Tabs>
                </Box>
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
              <Grid container spacing={2} style={{margin: 2}}>
                <Grid item>
                  <Button disabled={!isModified} variant="outlined" color="primary" type="button"
                          onClick={() => {
                            updateEntity(loadedEntity, modifiedEntity, navigate).then((response) => {
                                if (response?.status === 200) {
                                  alert("modifications saved successfully");
                                } else {
                                  alert("error saving the entity")
                                }
                              }
                            )
                          }}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="error" type="button"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this entity?") === true) {
                              deleteEntity(loadedEntity, navigate)
                            }
                          }}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
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
