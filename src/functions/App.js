export async function getSearchResults(searchKey, setStateFunc) {
  this.startLoading();
  if (searchKey.length > 1) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
    if (searchKey.includes(":")) {
      let searchArray = searchKey.split(":", 2);
      searchUrl += searchArray[1] + '&categories=' + searchArray[0];
    } else {
      searchUrl += searchKey;
    }
    searchUrl += '&limit=15';
    fetch(searchUrl, {
      method: 'GET'
    }).then(results => {
      return results.json();
    }, error => {
      console.log("error connecting to server:", error)
    }).then(data => {
      setStateFunc(data);
    }).then(
      end => this.endLoading()
    );
  }

}

export async function getEntity(title, setStateFunc) {
  this.startLoading();
  fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + title, {
    method: 'GET'
  }).then(results => {
    if (results.status === 200) {
      return results.json();
    }
    return null
  }).then(data => {
    setStateFunc(data);
  }).then(
    end => this.endLoading()
  );
}
