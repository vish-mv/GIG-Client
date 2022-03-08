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
        <Routes>
          <Route path="/search/:searchKey" element={<SearchResults/>}/>
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
