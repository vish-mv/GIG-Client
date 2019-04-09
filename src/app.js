import React, {Component} from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Header from "./shared/header";
import SearchResults from "./results/results";
import ViewResult from "./view/view"

import './app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchResults: [],
      loadedEntity: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    this.setState({[key]: value});
    console.log(this.state.searchKey);
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
                   />}
            />
            <Route path="/search/:searchKey"
                   render={(props) => <SearchResults {...props}
                                                     searchKey={this.state.searchKey}
                                                     handleChange={this.handleChange}
                   />}
            />
            <Route path="/content/:title/:id" component={ViewResult}/>
          </HashRouter>
        </header>
      </div>
    );
  }
}

export default App;
