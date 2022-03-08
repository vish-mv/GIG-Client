export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {'Authorization': 'Bearer ' + (token ? token : ''), 'Content-Type': 'application/json'};
}

export function userIsAuthorized(user) {
  return user

}
