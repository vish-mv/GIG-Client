import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Button from "@mui/material/Button/Button";

function RedirectUser(url){
  const navigate = useNavigate();
  return navigate(url);
}

const styles = theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
  },
  searchResult: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: 'black',
    textAlign: 'left',
    margin: '10px',
  },
  paragraph: {
    margin: '15px 0'
  },
  link: {
    paddingRight: '10px'
  }
});

class EditEntity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modifiedEntity: {},
      originalTitle: "",
      changesMade: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSave() {
    console.log(this.state.originalTitle);
    console.log(this.state.modifiedEntity);
    let updateUrl = process.env.REACT_APP_SERVER_URL + 'api/update';
    const requestOptions = {
      headers: this.props.getHeaders(),
      method: 'POST',
      body: JSON.stringify({title: this.state.originalTitle, entity: this.state.modifiedEntity})
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
          alert("login error!");
        }
      }
    });
  }

  handleDelete() {
    let isConfirmed = window.confirm("Are you sure you want to delete this entity?");
    if (isConfirmed) {
      let deleteUrl = process.env.REACT_APP_SERVER_URL + 'api/delete';
      const requestOptions = {
        headers: this.props.getHeaders(),
        method: 'POST',
        body: JSON.stringify({title: this.state.originalTitle})
      };
      fetch(deleteUrl, requestOptions).then(results => {
        return results.json();
      }, error => {
        alert("error connecting to server");
      }).then(data => {
        if (data) {
          if (data.status === 200) {
            this.props.history.push('/');
          }
          else {
            alert("login error! " + data.status);
          }
        }
      });
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value.jsObject, changesMade: true});
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title + this.props.location.search);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title + this.props.location.search);
    }
    if (this.props.loadedEntity.title && this.state.originalTitle === "") {
      this.setState({originalTitle: this.props.loadedEntity.title, modifiedEntity: this.props.loadedEntity})
    }
  }

  render() {
    const {classes, loadedEntity, user} = this.props;
    if (!user) {
      // not logged in so redirect to login page with the return url
      return RedirectUser('/login?redirect=' + loadedEntity.title + "&redirect=" + this.props.location);
    }
    return (
      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            {loadedEntity ?
              <div>
                <JSONInput
                  id='entity_editor'
                  placeholder={this.state.modifiedEntity}
                  // colors      = { darktheme }
                  locale={locale}
                  height
                  width
                  onChange={(e) => this.handleChange("modifiedEntity", e)}
                />
                <Button disabled={!this.state.changesMade} variant="contained" color="primary" type="button"
                        onClick={this.handleSave}>
                  Save
                </Button>
                <Button variant="contained" color="error" type="button"
                        onClick={this.handleDelete}>
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
}

EditEntity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditEntity);
