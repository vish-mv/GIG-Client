import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles";

function Login(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {classes, setUser} = props;

  let redirectUrl = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();
    if (username === "" || password === "") {
      setError("username/password required!");
    }
    else {

      let loginUrl = process.env.REACT_APP_SERVER_URL + 'api/user/login';
      const requestOptions = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
      };
      fetch(loginUrl, requestOptions).then(results => {
        return results.json();
      }, error => {
        console.log("error connecting to server");
        setError("server error!");
      }).then(data => {
        if (data) {
          // this.handleChange("loginResult", data);
          if (data.status === 403) {
            setError(data.payload);
          }
          else if (data.status === 200) {
            setUser(username);
            localStorage.setItem('token', data.payload);
            localStorage.setItem('username', username);
            navigate(redirectUrl)
          }
          else {
            setError("login error!");
          }
        }
      });
    }
  }

  return (
    <header className="App-header">
      <div className="content">
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <p>
          Login
        </p>
        <p className={classes.errorText}>{error}</p>
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          <TextField
            id="username"
            name="username"
            className="search-text"
            margin="normal"
            variant='standard'
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          /><br/>
          <TextField
            id="password"
            name="password"
            className="search-text"
            variant='standard'
            margin="normal"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button><br/>
          <Link to={'/'} className={classes.linkButton}>go back Home</Link>
        </form>
      </div>
    </header>
  );
}

export default withStyles(Styles)(Login);
