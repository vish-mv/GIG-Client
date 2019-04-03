import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

import SearchResults from "../results/results";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = key => event => {
    this.setState({[key]: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.search.length > 3) {
      this.setState({submitted: true});
    }
  }

  render() {
    if (this.state.submitted) {
      return <SearchResults search={this.state.search} handleChange={() => this.handleChange('search')}/>
    }
    else {
      return (
        <div className="content">
          <h1>GIG</h1>
          <p>
            General Information Graph
          </p>
          <form id="search-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <TextField
              fullWidth={true}
              id="search-input"
              name="search"
              value={this.state.search}
              onChange={this.handleChange('search')}
              className="search-text"
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </form>
        </div>
      );
    }
  }
}

export default Home;
