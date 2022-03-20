import React from 'react';
import {Link} from "react-router-dom";
import {logout} from "../../../auth/User";
import {AppRoutes} from "../../../routes";
import {withStyles} from "@mui/styles";
import Styles from "../Styles";

function UserInfo(props) {
  const {user, classes, setUser} = props;

  if (user) {
    return <div style={{fontSize: '14px'}}>
      <Link to={'#'}
            onClick={() => logout(setUser)}
            className={classes.loginButton}>{user} - Logout
      </Link></div>
  }
  return <div style={{fontSize: '14px'}}>
    <Link to={AppRoutes.login} className={classes.loginButton}>Login</Link> or
    <Link to={AppRoutes.register} className={classes.loginButton}>Register</Link>
  </div>
}

export default withStyles(Styles)(UserInfo);
