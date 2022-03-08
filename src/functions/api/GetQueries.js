export async function getResults(searchUrl, newSearch, result, page, setResults, setPage, limit) {
  searchUrl += '&limit=' + limit + '&page=' + (newSearch ? 1 : (page + 1));
  const response = await fetch(searchUrl, {method: 'GET'});
  const json = await response.json();

  if (response.status === 200) {
    if (newSearch || result == null) {
      setResults(json);
      setPage(1);
    } else {
      if (json) {
        setResults(result.concat(json));
        setPage(page + 1);
      } else {
        setResults([]);
        setPage(0);
        return false;
      }
    }
  }
  return true
}

export function getEntity(entityTitle, callback) {
  fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + entityTitle, {
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
