import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../shared/Styles";
import {readerRegister} from "@lsflk/gig-client-shared/auth";
import {AppRoutes} from "../../routes";

function Register(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {classes, setUser} = props;

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== "" && password === confirmPassword) {
      const response = await readerRegister(username, password);
      console.log(response);
      if (response.error) {
        setError(response.error)
      } else {
        setUser(username);
        navigate(AppRoutes.home)
      }
    }
    else{
      setError("Password and Confirm Password Fields are not matching!")
    }
  }

  return (
    <header className="App-header">
      <div className="content">
        <h1 style={{fontSize: 80}}>GIG</h1>
        <p>
          General Information Graph
        </p>
        <h5>
          Register New User
        </h5>
        <p className={classes.errorText}>{error}</p>
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          <TextField
            size="small"
            id="username"
            name="username"
            type="email"
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
          /><br/>
          <TextField
            size="small"
            id="password"
            name="password"
            margin="normal"
            type="password"
            placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          /><br/><br/>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button><br/>
          <Link to={'/'} className={classes.linkButton}>go back Home</Link>
        </form>
      </div>
    </header>
  );
}

export default withStyles(Styles)(Register);
