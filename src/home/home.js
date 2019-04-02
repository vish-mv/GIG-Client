import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

class Home extends Component {
  render() {
    return (
      <div className="content">
        <h1>GIG</h1>
        <p>
          General Information Graph
        </p>
        <form id="search-form">
          <TextField
            fullWidth={true}
            id="search-input"
            name="search"
            defaultValue=""
            className="search-text"
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default Home;
