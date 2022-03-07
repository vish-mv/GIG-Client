import {css} from "@emotion/react";
import Color from "color";



constructor(props) {
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.getStats = this.getStats.bind(this);
  this.state = {
    stats: []
  }
}

componentDidMount() {
  this.getStats();
}




