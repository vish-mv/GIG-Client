import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/shared/header/Header";
import SearchResults from "./components/results/SearchResults";
import ViewEntity from "./components/entity/View"
import EditEntity from "./components/entity/Edit"
import Login from "./components/login/Login"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {getAuthUser, logout, ProtectedRoute} from "@lsflk/gig-client-shared/auth";
import {validateToken} from "@lsflk/gig-client-shared/functions";
import Home from "./components/home/Home";
import Graph from "./components/graphs/graph/Graph";
import {AppRoutes} from "./routes";
import Register from "./components/register/Register";

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
          <Route path={AppRoutes.login} element={<Login {...app_props}/>}/>
          <Route path={AppRoutes.register} element={<Register {...app_props}/>}/>
          <Route element={<Header {...app_props}/>}>
            <Route path={AppRoutes.search + ":searchParam"} element={<SearchResults {...app_props}/>}/>
            <Route path={AppRoutes.entity + ":titleParam"} element={<ViewEntity {...app_props}/>}/>
            <Route path={AppRoutes.edit + ":titleParam"}
                   element={<ProtectedRoute><EditEntity {...app_props}/></ProtectedRoute>}/>
            <Route path={AppRoutes.graph} element={<Graph {...app_props}/>}/>
          </Route>

          <Route path="*" element={<div>invalid url!</div>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
