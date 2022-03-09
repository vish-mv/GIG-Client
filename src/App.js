import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/shared/header/Header";
import SearchResults from "./components/results/SearchResults";
import ViewEntity from "./components/view/View"
import EditEntity from "./components/view/Edit"
import Login from "./components/login/Login"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {validateToken} from "./auth/Authentication";
import {ProtectedRoute} from "./auth/ProtectedRoute";
import {getAuthUser, logout} from "./auth/User";
import Home from "./components/home/Home";

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [searchKey, setSearchKey] = useState("");
  const [user, setUser] = useState(getAuthUser());
  const [isLoading, setIsLoading] = useState(false);
  const app_props = {user, setUser, isLoading, setIsLoading, logout, searchKey, setSearchKey};

  useEffect(() => {
    if (user) {
      validateToken(setUser);
    }
  }, [user]);

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Routes>
          <Route index element={<Home {...app_props}/>}/>
          <Route path="/login" element={<Login {...app_props}/>}/>
          <Route element={<Header {...app_props}/>}>
            <Route path="search/:searchParam" element={<SearchResults {...app_props}/>}/>
            <Route path="/content/:titleParam" element={<ViewEntity {...app_props}/>}/>
            <Route path="/edit/:titleParam" element={<ProtectedRoute><EditEntity {...app_props}/></ProtectedRoute>}/>
          </Route>

          <Route path="*" element={<div>invalid url!</div>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
