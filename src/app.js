import React, {Component} from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Header from "./shared/header";
import SearchResults from "./results/results";
import ViewEntity from "./view/view"
import EditEntity from "./view/edit"
import Login from "./login/login"
import './app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchResults: [],
      loadedEntity: [],
      loading: true,
      user: localStorage.getItem('user'),
    };

    this.handleChange = this.handleChange.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.endLoading = this.endLoading.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.getEntity = this.getEntity.bind(this);
    this.logout = this.logout.bind(this);
  }

  startLoading() {
    this.setState({loading: true});
  }

  endLoading() {
    this.setState({loading: false});
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  logout(){
    this.setState({user: null});
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getSearchResults(searchKey) {
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

  getEntity(title) {
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

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <HashRouter>
            <Route path="/"
                   render={(props) => <Header {...props}
                                              searchKey={this.state.searchKey}
                                              handleChange={this.handleChange}
                                              getSearchResults={this.getSearchResults}
                                              loading={this.state.loading}
                                              user = {this.state.user}
                                              logout={this.logout}
                   />}
            />
            <Route path="/search/:searchKey"
                   render={(props) => <SearchResults {...props}
                                                     searchKey={this.state.searchKey}
                                                     handleChange={this.handleChange}
                                                     searchResults={this.state.searchResults}
                                                     getSearchResults={this.getSearchResults}
                   />}
            />
            <Route path="/content/:title"
                   render={(props) => <ViewEntity {...props}
                                                  getEntity={this.getEntity}
                                                  loadedEntity={this.state.loadedEntity}
                                                  handleChange={this.handleChange}
                   />}
            />
            <Route path="/edit/:title"
                   render={(props) => <EditEntity {...props}
                                                  getEntity={this.getEntity}
                                                  loadedEntity={this.state.loadedEntity}
                                                  handleChange={this.handleChange}
                                                  user = {this.state.user}
                   />}
            />
            <Route path="/login"
                   render={(props) => <Login {...props}
                                             handleChange={this.handleChange}
                                             user = {this.state.user}
                   />}
            />
          </HashRouter>
        </header>
      </div>
    );
  }
}

export default App;
