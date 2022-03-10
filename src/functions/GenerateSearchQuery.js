export function generateSearchQuery(searchParam){
  let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
  if (searchParam.includes(":")) {
    let searchArray = searchParam.split(":", 2);
    searchUrl += searchArray[1] + '&categories=' + searchArray[0];
  } else {
    searchUrl += searchParam;
  }
  return searchUrl
}
