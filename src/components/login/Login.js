import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../shared/Styles";
import {userLogin} from "@lsflk/gig-client-shared/auth";
import {AppRoutes} from "../../routes";

function Login(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {classes, setUser} = props;

  let redirectUrl = location.state?.from?.pathname || AppRoutes.home;

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await userLogin(username, password);
    if (response.error) {
      setError(response.error)
    } else {
      setUser(username);
      navigate(redirectUrl)
    }
  }

  return (
    <header className="App-header">
      <div className="content">
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <h5>
          Login
        </h5>
        <p className={classes.errorText}>{error}</p>
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          <TextField
            size="small"
            id="username"
            name="username"
            margin="normal"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          /><br/>
          <TextField
            size="small"
            id="password"
            name="password"
            margin="normal"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          /><br/><br/>
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
