import React from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Header from "./components/shared/Header";
import SearchResults from "./components/results/Results";
import ViewEntity from "./components/view/View"
import EditEntity from "./components/view/Edit"
import Login from "./components/login/Login"
import './App.css';

function App() {

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
                                            user={this.state.user}
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
                                                user={this.state.user}
                                                getHeaders={this.getAuthHeaders}
                 />}
          />
          <Route path="/login"
                 render={(props) => <Login {...props}
                                           handleChange={this.handleChange}
                                           user={this.state.user}
                 />}
          />
          <Route
            path="*"
            element={
              <main style={{padding: "1rem"}}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
