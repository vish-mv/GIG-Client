constructor(props)
{
  super(props);
  this.state = {
    searchKey: "",
    searchResults: [],
    loadedEntity: [],
    loading: true,
    user: localStorage.getItem('username'),
  };
  this.handleChange = this.handleChange.bind(this);
  this.startLoading = this.startLoading.bind(this);
  this.endLoading = this.endLoading.bind(this);
  this.getSearchResults = this.getSearchResults.bind(this);
  this.getEntity = this.getEntity.bind(this);
  this.logout = this.logout.bind(this);
  this.getAuthHeaders = this.getAuthHeaders.bind(this);

  let loginUrl = process.env.REACT_APP_SERVER_URL + 'api/token/validate';

  const requestOptions = {
    headers: this.getAuthHeaders(),
    method: 'GET',
  };
  fetch(loginUrl, requestOptions).then(results => {
    return results.json();
  }, error => {
    console.log("error connecting to server");
    this.setState({error: "server error!"})
  }).then(data => {
    this.handleChange("loginResult", data);
    if (data.status === 200) {
      console.log("token is valid.")
    }
    else {
      this.logout();
      console.log("token validation error!");
    }
  });
}

startLoading()
{
  this.setState({loading: true});
}

endLoading()
{
  this.setState({loading: false});
}

getAuthHeaders()
{
  const token = localStorage.getItem('token');
  return {'Authorization': 'Bearer ' + (token ? token : ''), 'Content-Type': 'application/json'};
}

handleChange(key, value)
{
  this.setState({[key]: value});
}



getSearchResults(searchKey)
{
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
      console.log("error connecting to server")
    }).then(data => {
      this.handleChange("searchResults", data);
    }).then(
      end => this.endLoading()
    );
  }

}

getEntity(title)
{
  this.startLoading();
  fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + title, {
    method: 'GET'
  }).then(results => {
    if (results.status === 200) {
      return results.json();
    }
    return null
  }).then(data => {
    this.handleChange("loadedEntity", data);
  }).then(
    end => this.endLoading()
  );
}
