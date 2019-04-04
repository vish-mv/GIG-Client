import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchKey: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.searchKey.length>3) {
      this.props.history.push(`/search/` + this.state.searchKey);
    }
  }

  render() {
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
            value={this.state.searchKey}
            onChange={this.handleChange}
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

export default Home;
