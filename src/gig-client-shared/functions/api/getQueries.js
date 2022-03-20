import {ApiRoutes, getServerUrl} from "../../../server";

export async function getResults(searchUrl, newSearch, result, page, setResults, setPage, limit) {
  searchUrl += '&limit=' + limit + '&page=' + (newSearch ? 1 : (page + 1));
  const response = await fetch(searchUrl, {method: 'GET'});
  const json = await response.json();
  if (json) {
    if (response.status === 200) {
      if (newSearch || result == null) {
        setResults(json);
        setPage(1);
        return json
      } else {
        setResults(result.concat(json));
        setPage(page + 1);
        return json
      }
    }
  }
}

export function getEntity(entityTitle, callback) {
  fetch(getServerUrl(ApiRoutes.entity) + entityTitle, {
    method: 'GET'
  }).then(results => {
    if (results.status === 200) {
      return results.json();
    }
    return null
  }).then(data => {
    callback(data);
  });
  return true
}

