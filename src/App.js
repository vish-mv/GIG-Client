import React, {useState, useEffect} from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import Header from "./components/shared/header/Header";
import SearchResults from "./components/results/SearchResults";
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

function App() {

  const [user, setUser] = useState(localStorage.getItem('username'));
  const [isLoading, setIsLoading] = useState(false);
  const app_props = {user, setUser, logout, isLoading, setIsLoading};

  function logout() {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {'Authorization': 'Bearer ' + (token ? token : ''), 'Content-Type': 'application/json'};
  }

  function validateToken(){
    console.log("validating token");
    let loginUrl = process.env.REACT_APP_SERVER_URL + 'api/token/validate';

    const requestOptions = {
      headers: getAuthHeaders(),
      method: 'GET',
    };
    fetch(loginUrl, requestOptions).then(results => {
      return results.json();
    }, error => {
      console.log("error connecting to server");
      this.setState({error: "server error!"})
    }).then(data => {
      if (data.status === 200) {
        console.log("token is valid.")
      }
      else {
        logout();
        console.log("token validation error! logging out.");
      }
    });
  }

  useEffect(()=>{
    if (user) {
      validateToken();
    }
  },[user]);

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Header {...app_props}/>
        <Routes>
          <Route path="/search/:searchParam" element={<SearchResults {...app_props}/>}/>
          <Route path="/content/:title" element={<ViewEntity/>}/>
          <Route path="/edit/:title" element={<EditEntity/>}/>
          <Route path="/login" element={<Login {...app_props}/>}/>
          <Route path="*" element={<div>invalid url!</div>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
