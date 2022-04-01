import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../shared/Styles";
import {readerRegister} from "@lsflk/gig-client-shared/auth";
import {AppRoutes} from "../../routes";
import Typography from "@mui/material/Typography/Typography";
import FormControl from "@mui/material/FormControl/FormControl";

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
      if (response.error) {
        setError(response.error)
      } else {
        setUser(username);
        navigate(AppRoutes.home)
      }
    }
    else {
      setError("Password and Confirm Password Fields are not matching!")
    }
  }

  return (
    <header className="App-header">
      <div className="content">
        <Typography variant="h1">GIG</Typography>
        <Typography variant="h4">General Information Graph</Typography>
        <Typography variant="h5">Register New User</Typography>
        <p className={classes.errorText}>{error}</p>
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          <FormControl sx={{flexDirection: "column"}}>
            <TextField
              size="small"
              id="username"
              name="username"
              type="email"
              margin="dense"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              size="small"
              id="password"
              name="password"
              type="password"
              margin="dense"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              size="small"
              id="confirm-password"
              name="confirm-password"
              margin="dense"
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" sx={{marginTop:1}}>
              Register
            </Button>
            <Link to={AppRoutes.login} className={classes.linkButton}>Login</Link>
            <Link to={'/'} className={classes.linkButton}>go back Home</Link>
          </FormControl>
        </form>
      </div>
    </header>
  );
}

export default withStyles(Styles)(Register);
