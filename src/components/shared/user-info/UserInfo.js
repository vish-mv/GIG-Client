import React from 'react';
import {Link} from "react-router-dom";
import {logout} from "@lsflk/gig-client-shared/auth";
import {AppRoutes} from "../../../routes";
import {withStyles} from "@mui/styles";
import Styles from "../Styles";

function UserInfo(props) {
  const {user, classes, setUser, color} = props;

  if (user) {
    return <div style={{fontSize: '12px', color: color}}>
      <Link to={'#'} style={{color: color}}
            onClick={() => logout(setUser)}
            className={classes.loginButton}>{user} - Logout
      </Link></div>
  }
  return <div style={{fontSize: '12px', color: color}}>
    <Link to={AppRoutes.login} className={classes.loginButton} style={{color: color}}>Login</Link> or
    <Link to={AppRoutes.register} className={classes.loginButton} style={{color: color}}>Register</Link>
  </div>
}

export default withStyles(Styles)(UserInfo);
