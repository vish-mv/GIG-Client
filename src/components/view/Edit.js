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
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box/Box";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import TabPanel from "./EditTabPanel"
import EditUI from "./EditUI"

function EditEntity(props) {

  const navigate = useNavigate();
  const {titleParam} = useParams();
  const {classes, user} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [modifiedEntity, setModifiedEntity] = useState(null);
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

  useEffect(() => {
    if (user) {
      if (!loadedEntity || (loadedEntity.title !== titleParam)) {
        console.log("get profile entity:", titleParam);
        getEntity(titleParam).then(entity => setLoadedEntity(entity));
      }
    }
  });

  return (
    <div className="content">
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={1}>
          {loadedEntity ?
            <div>
              <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                  <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Edit UI" {...a11yProps(0)} />
                    <Tab label="JSON Editor" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <EditUI entity={loadedEntity}/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
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
                </TabPanel>
              </Box>
              <Grid container spacing={2} style={{margin: 2}}>
                <Grid item>
                  <Button variant="outlined" color="primary" type="button"
                          onClick={() => updateEntity(loadedEntity, modifiedEntity['jsObject'], navigate)}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="error" type="button"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this entity?") === true) {
                              deleteEntity(loadedEntity, navigate)
                            }
                          }
                          }>
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
