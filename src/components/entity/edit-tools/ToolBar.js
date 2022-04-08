import React, {useState} from "react";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button/Button";
import {deleteEntity, updateEntity} from "gig-client-shared/functions";
import Paper from "@mui/material/Paper/Paper";
import {AppRoutes} from "../../../routes";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import Box from "@mui/material/Box/Box";
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import {Link, useNavigate} from "react-router-dom";

export default function ToolBar(props) {
  const navigate = useNavigate();
  const {isModified, loadedEntity, modifiedEntity, tabValue, handleChange, setIsModified} = props;
  const [status, setStatus] = useState(null);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const saveSuccessMessage = <div style={{marginTop: 8}}><Typography variant="p" style={{color: 'green'}}>Entity Saved
    Successfully!</Typography></div>;
  const saveErrorMessage = <div style={{marginTop: 8}}><Typography variant="p" style={{color: 'red'}}>Error Saving
    Entity!</Typography></div>;
  const deleteConfirmMessage = <Typography variant="p" style={{color: 'red'}}>Are you sure you want to delete this
    entity? <Button variant="outlined" color="error" type="button" style={{marginRight: 8, marginLeft: 8}}
                    onClick={() => {
                      deleteEntity(loadedEntity);
                      navigate(AppRoutes.home)
                    }}> Yes </Button>
    <Button variant="outlined" color="primary" type="button"
            onClick={() => {
              setStatus(null);
            }}> No </Button>
  </Typography>;

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
        <Grid container spacing={1} style={{textAlign: 'right'}}>
          <Grid lg={10} item style={{textAlign: 'center'}}>
            <Fade in={!!status}>
              <div>{status}</div>
            </Fade>
          </Grid>
          <Grid item>
            <Button component={Link} to={AppRoutes.entity + loadedEntity?.title} variant="outlined">View</Button>
          </Grid>
          <Grid item>
            <Button disabled={!isModified} variant="outlined" color="primary" type="button"
                    onClick={() => {
                      updateEntity(loadedEntity, modifiedEntity).then((response) => {
                          if (response?.status === 200) {
                            setStatus(saveSuccessMessage);
                            setIsModified(false);
                          } else {
                            setStatus(saveErrorMessage);
                          }
                          setTimeout(() => setStatus(null), 5000)
                        }
                      )
                    }}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" type="button"
                    onClick={() => {
                      setStatus(deleteConfirmMessage);
                      setTimeout(() => setStatus(null), 5000);
                    }}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
}
