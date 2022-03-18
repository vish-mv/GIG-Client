import React from "react";
import {ForceGraph2D, ForceGraph3D} from 'react-force-graph';
import {GraphStyle} from "./Constants";

function GraphStyleWrapper(props) {
  const {graphStyle} = props;

  if (graphStyle === GraphStyle.twoDimensional) {
    return <ForceGraph2D {...props}/>
  }
  return <ForceGraph3D {...props} />
}

export default GraphStyleWrapper
