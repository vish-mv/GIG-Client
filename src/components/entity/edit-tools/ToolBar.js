import React from "react";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button/Button";
import {deleteEntity, updateEntity} from "@lsflk/gig-client-shared/functions";
import Paper from "@mui/material/Paper/Paper";
import {AppRoutes} from "../../../routes";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import Box from "@mui/material/Box/Box";

export default function ToolBar(props) {
  const {isModified, loadedEntity, modifiedEntity, tabValue, handleChange} = props;

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return <Paper elevation={3} sx={{position: 'fixed', zIndex: 200, padding: 1, width: '100%'}}>
    <Grid container spacing={1}>
      <Grid item sx={{margin: -1}} lg={2}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Edit UI" {...a11yProps(0)} />
            <Tab label="JSON Editor" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Grid>
      <Grid item lg={10}>
        <Grid container spacing={1}>
          <Grid lg={9} item/>
          <Grid item>
            <Button component="a" href={AppRoutes.entity + loadedEntity?.title} variant="outlined">View</Button>
          </Grid>
          <Grid item>
            <Button disabled={!isModified} variant="outlined" color="primary" type="button"
                    onClick={() => {
                      updateEntity(loadedEntity, modifiedEntity).then((response) => {
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
                        deleteEntity(loadedEntity)
                      }
                    }}>
              Delete
            </Button>
          </Grid>
          <Grid item>
            {/*<Alert severity="success">*/}
            {/*This is a success alert — check it out!</Alert>*/}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
}
