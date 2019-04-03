import React, {Component} from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from "./home/home";

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HashRouter>
                <Route path="/" component={Home}/>
          </HashRouter>
        </header>
      </div>
    );
  }
}

export default App;
