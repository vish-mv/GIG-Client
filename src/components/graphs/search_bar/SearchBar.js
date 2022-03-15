import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ResartAltIcon from '@mui/icons-material/RestartAlt';
import {AppPreferences} from "../../../preferences";

export default function SearchBar(props) {
  const {searchKey, setSearchKey} = props;
  const [searchInput, setSearchInput] = useState(searchKey);

  function handleSubmit(event) {
    event.preventDefault();
    if (searchInput.length > AppPreferences.minimumSearchKeyLength) {
      setSearchKey(searchInput);
    }
  }

  function resetGraph() {
    setSearchInput("");
    setSearchKey("");
  }

  return (
    <Paper
      onSubmit={(e) => handleSubmit(e)}
      elevation={3}
      component="form"
      sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 2}}
    >
      <IconButton sx={{p: '10px'}} aria-label="menu">
        <MenuIcon/>
      </IconButton>
      <InputBase
        sx={{ml: 1, flex: 1}}
        placeholder="Search Graph"
        inputProps={{'aria-label': 'search graph'}}
        name="searchGraph"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
        <SearchIcon/>
      </IconButton>
      <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
      <IconButton onClick={resetGraph} color="primary" sx={{p: '10px'}} aria-label="directions">
        <ResartAltIcon/>
      </IconButton>
    </Paper>
  );
}
