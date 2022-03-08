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

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [user, setUser] = useState(getAuthUser());
  const [isLoading, setIsLoading] = useState(false);
  const app_props = {user, setUser, isLoading, setIsLoading,logout};

  useEffect(() => {
    if (user) {
      validateToken();
    }
  });

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Header {...app_props}/>
        <Routes>
          <Route path="/search/:searchParam" element={<SearchResults {...app_props}/>}/>
          <Route path="/content/:titleParam" element={<ViewEntity {...app_props}/>}/>
          <Route path="/edit/:titleParam" element={<ProtectedRoute><EditEntity {...app_props}/></ProtectedRoute>}/>
          <Route path="/login" element={<Login {...app_props}/>}/>
          <Route path="*" element={<div>invalid url!</div>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
