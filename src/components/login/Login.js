import React, {useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../shared/Styles";
import {userLogin} from "gig-client-shared/auth";
import {AppRoutes} from "../../routes";
import Typography from "@mui/material/Typography/Typography";
import FormControl from "@mui/material/FormControl/FormControl";

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
        <Typography variant="h1">GIG</Typography>
        <Typography variant="h4">General Information Graph</Typography>
        <Typography variant="h5">Login</Typography>
        <Typography className={classes.errorText}>{error}</Typography>
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          <FormControl sx={{flexDirection: "column"}}>
            <TextField
              size="small"
              id="username"
              name="username"
              margin="dense"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              size="small"
              id="password"
              name="password"
              margin="dense"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" sx={{marginTop:1}}>
              Login
            </Button>
            <Link to={AppRoutes.register} className={classes.linkButton}>Register</Link>
            <Link to={'/'} className={classes.linkButton}>go back Home</Link>
          </FormControl>
        </form>
      </div>
    </header>
  );
}

export default withStyles(Styles)(Login);
