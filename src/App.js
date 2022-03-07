import React, {useState} from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import Header from "./components/shared/header/Header";
import SearchResults from "./components/results/Results";
import ViewEntity from "./components/view/View"
import EditEntity from "./components/view/Edit"
import Login from "./components/login/Login"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
appTheme.spacing(2);

function App() {

  function logout() {
    this.setState({user: null});
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  const [searchKey, setSearchKey] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const app_props = {searchKey, setSearchKey, user, setUser, logout, isLoading, setIsLoading};
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Header {...app_props}/>
        {/*<Routes>*/}
        {/*<Route path="/search/:searchKey"*/}
        {/*render={(props) => <SearchResults {...props}*/}
        {/*searchKey={this.state.searchKey}*/}
        {/*handleChange={this.handleChange}*/}
        {/*searchResults={this.state.searchResults}*/}
        {/*getSearchResults={this.getSearchResults}*/}
        {/*/>}*/}
        {/*/>*/}
        {/*<Route path="/content/:title"*/}
        {/*render={(props) => <ViewEntity {...props}*/}
        {/*getEntity={this.getEntity}*/}
        {/*loadedEntity={this.state.loadedEntity}*/}
        {/*handleChange={this.handleChange}*/}
        {/*/>}*/}
        {/*/>*/}
        {/*<Route path="/edit/:title"*/}
        {/*render={(props) => <EditEntity {...props}*/}
        {/*getEntity={this.getEntity}*/}
        {/*loadedEntity={this.state.loadedEntity}*/}
        {/*handleChange={this.handleChange}*/}
        {/*user={this.state.user}*/}
        {/*getHeaders={this.getAuthHeaders}*/}
        {/*/>}*/}
        {/*/>*/}
        {/*<Route path="/login"*/}
        {/*render={(props) => <Login {...props}*/}
        {/*handleChange={this.handleChange}*/}
        {/*user={this.state.user}*/}
        {/*/>}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*path="*"*/}
        {/*element={*/}
        {/*<main style={{padding: "1rem"}}>*/}
        {/*<p>There's nothing here!</p>*/}
        {/*</main>*/}
        {/*}*/}
        {/*/>*/}
        {/*<Route path="*" element={<div>invalid url!</div>}/>*/}
        {/*</Routes>*/}
      </div>
    </ThemeProvider>
  );
}

export default App;
