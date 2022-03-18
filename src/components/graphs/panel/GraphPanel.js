import React from "react"
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import {GraphStyle, GraphTheme, NodeStyle} from "../graph/Constants";
import "./GraphPanel.css"
import SearchBar from "../search_bar/SearchBar"
import Fade from '@mui/material/Fade';

const panelUI = {
  position: 'absolute',
  margin: 2,
  top: '70px',
  padding: 2,
};

function GraphPanel(props) {

  const {
    nodeStyle, setNodeStyle,
    setResultsPerNode,
    backgroundTheme, setBackgroundTheme,
    graphStyle, setGraphStyle,
    viewGraphPanel, graphData
  } = props;

  const handleNodeStyleChange = (event) => {
    setNodeStyle(NodeStyle[event.target.value]);
  };

  const handleGraphThemeChange = (event) => {
    setBackgroundTheme(GraphTheme[event.target.value]);
  };

  const handleGraphStyleChange = (event) => {
    setGraphStyle(GraphStyle[event.target.value]);
  };

  const handleResultsPerNodeLimitChange = (event, value) => {
    setResultsPerNode(value);
  };

  return (
    <div style={panelUI}>
      {graphData &&
      <div>
        <SearchBar {...props} />
        <Fade in={graphData && viewGraphPanel}>
          <Paper elevation={3} sx={{padding: 2, width: 'fit-content', margin: 2}}>
            <FormControl>
              <FormLabel id="graph-theme-radio-buttons-group-label">Graph Theme</FormLabel>
              <RadioGroup
                row
                aria-labelledby="graph-theme-radio-buttons-group-label"
                name="graph-theme-radio-buttons-group-row"
                value={backgroundTheme.value}
                onChange={handleGraphThemeChange}
              >
                <FormControlLabel value={GraphTheme.dark.value} control={<Radio color="success"/>}
                                  label={GraphTheme.dark.label}/>
                <FormControlLabel value={GraphTheme.light.value} control={<Radio color="success"/>}
                                  label={GraphTheme.light.label}/>
              </RadioGroup>
              <Divider variant="middle"/><br/>
              <FormLabel id="graph-style-radio-buttons-group-label">Graph Style</FormLabel>
              <RadioGroup
                row
                aria-labelledby="graph-style-radio-buttons-group-label"
                name="graph-style-radio-buttons-group-row"
                value={graphStyle.value}
                onChange={handleGraphStyleChange}
              >
                <FormControlLabel value={GraphStyle.threeDimensional.value} control={<Radio color="secondary"/>}
                                  label={GraphStyle.threeDimensional.label}/>
                <FormControlLabel value={GraphStyle.twoDimensional.value} control={<Radio color="secondary"/>}
                                  label={GraphStyle.twoDimensional.label}/>
              </RadioGroup>
              <Divider variant="middle"/><br/>
              <FormLabel id="node-view-radio-buttons-group-label">Node Style</FormLabel>
              <RadioGroup
                row
                aria-labelledby="node-view-radio-buttons-group-label"
                name="node-view-radio-buttons-row"
                value={nodeStyle.value}
                onChange={handleNodeStyleChange}
              >
                <FormControlLabel value={NodeStyle.sphere.value} control={<Radio/>}
                                  label={NodeStyle.sphere.label}/>
                <FormControlLabel value={NodeStyle.name.value} control={<Radio/>}
                                  label={NodeStyle.name.label}/>
              </RadioGroup>
              <Divider variant="middle"/><br/>
              <FormLabel id="slider-group-label">Max. Nodes per Category</FormLabel>
              <Slider defaultValue={100}
                      onChangeCommitted={handleResultsPerNodeLimitChange}
                      step={1}
                      min={0}
                      max={1000}
                      valueLabelDisplay="auto"/>
            </FormControl>
          </Paper>
        </Fade>
      </div>
      }
    </div>
  )
}

export default GraphPanel;
