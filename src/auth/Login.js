import {setAuthToken, setAuthUser, setUserRole} from "./User";

export async function userLogin(username, password) {
  if (username === "" || password === "") {
    return {error: "username/password required!"};
  }

  let loginUrl = process.env.REACT_APP_SERVER_URL + 'api/user/login';
  const requestOptions = {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({username: username, password: password})
  };
  let response = await fetch(loginUrl, requestOptions);
  let result = await response.json();
  if (result?.status === 200) {
    setAuthUser(result?.payload?.name);
    setAuthToken(result?.payload?.token);
    setUserRole(result?.payload?.role);
    return {error: null, result: "success"}
  }
  return {error: "Login failed!", result: "error"}
}
