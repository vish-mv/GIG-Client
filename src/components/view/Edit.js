import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {useNavigate, useParams} from 'react-router-dom';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Button from "@mui/material/Button/Button";
import {getEntity} from "../../functions/api/GetQueries";
import {Styles} from "./Styles";
import {getAuthHeaders} from "../../auth/authentication";

function EditEntity(props) {

  const navigate = useNavigate();
  const {titleParam} = useParams();
  const {classes, user} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [modifiedEntity, setModifiedEntity] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (user) {
      if (!loadedEntity || loadedEntity.title !== titleParam) {
        console.log("get profile entity:", titleParam);
        getEntity(titleParam, updateEntityState);
      }
    }
  });

  // if (!user) {
  //   // not logged in so redirect to login page with the return url
  //   return <Navigate to="/login" state={{from: location}} replace/>;
  // }

  async function updateEntityState(data) {
    setLoadedEntity(data);
    setModifiedEntity(data);
  }

  function handleSave() {
    let updateUrl = process.env.REACT_APP_SERVER_URL + 'api/update';
    const requestOptions = {
      headers: getAuthHeaders(),
      method: 'POST',
      body: JSON.stringify({title: loadedEntity.title, entity: modifiedEntity['jsObject']})
    };
    fetch(updateUrl, requestOptions).then(results => {
      return results.json();
    }, error => {
      alert("error connecting to server");
    }).then(data => {
      if (data) {
        if (data.status === 200) {
          alert("updated successfully!")
        }
        else {
          alert("Server error: error saving entity!");
        }
      }
    });
  }

  function handleDelete() {
    let isConfirmed = window.confirm("Are you sure you want to delete this entity?");
    if (isConfirmed) {
      let deleteUrl = process.env.REACT_APP_SERVER_URL + 'api/delete';
      const requestOptions = {
        headers: this.props.getHeaders(),
        method: 'POST',
        body: JSON.stringify({title: loadedEntity.title})
      };
      fetch(deleteUrl, requestOptions).then(results => {
        return results.json();
      }, error => {
        alert("error connecting to server");
      }).then(data => {
        if (data) {
          if (data.status === 200) {
            navigate('/');
          }
          else {
            alert("login error! " + data.status);
          }
        }
      });
    }
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
                      onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" color="error" type="button"
                      onClick={handleDelete}>
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
