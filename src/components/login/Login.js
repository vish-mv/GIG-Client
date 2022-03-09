import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles";
import {setAuthUser, setAuthToken} from "../../auth/User";
import {userLogin} from "../../auth/Login";

function Login(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {classes, setUser} = props;

  let redirectUrl = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();
    const response=await userLogin(username,password);
    if (response.error){
      setError(response.error)
    }else{
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
