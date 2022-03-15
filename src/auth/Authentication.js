import {getAuthToken, getUserRole, logout} from "./User";
import {UserRoles} from "./AuthStore";

export function getAuthHeaders() {
  const token = getAuthToken();
  return {'Authorization': 'Bearer ' + (token ? token : ''), 'Content-Type': 'application/json'};
}

export function userIsEditAuthorized() {
  const currentUserRole = getUserRole();
  return currentUserRole === UserRoles.Admin || currentUserRole === UserRoles.Editor;
}

export function validateToken(setUserState) {
  console.log("validating token");
  let loginUrl = process.env.REACT_APP_SERVER_URL + 'api/token/validate';

  const requestOptions = {
    headers: getAuthHeaders(),
    method: 'GET',
  };
  fetch(loginUrl, requestOptions).then(results => {
    return results.json();
  }, error => {
    console.log("error connecting to server");
    return {error: "server error!", result: false}
  }).then(data => {
    if (data.status === 200) {
      console.log("token is valid.");
      return {error: null, result: true}
    }
    else {
      logout(setUserState);
      console.log("token validation error! logging out.");
      return {error: "token validation error! logging out.", result: false}
    }
  });
}
