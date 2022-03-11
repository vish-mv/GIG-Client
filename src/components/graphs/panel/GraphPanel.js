import React from "react"
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';


const panelUI = {
  position: 'absolute',
  margin: 2,
  top: '100px',
  padding: 2,
};

function GraphPanel(props) {

  const {showNodeName, setShowNodeName, setResultsPerNode} = props;

  // TODO: Bug workaround - resetting back to sphere nodes is not working. Therefore reloading the page
  function refreshPage() {
    window.location.reload(false);
  }

  const handleViewChange = (event) => {
    setShowNodeName(event.target.value);
  };

  const handleResultsPerNodeLimitChange = (event,value) => {
    setResultsPerNode(value);
  };

  return (
    <Paper sx={panelUI} elevation={3}>
      <FormControl>
        <FormLabel id="node-theme-radio-buttons-group-label">Background Color</FormLabel>
        <RadioGroup
          row
          aria-labelledby="node-theme-radio-buttons-group-label"
          name="node-theme-radio-buttons-group-row"
          // value={showNodeName}
          // onChange={handleViewChange}
        >
          <FormControlLabel value="dark" control={<Radio color="success"/>} label="Dark"/>
          <FormControlLabel value="light" control={<Radio color="success"/>} label="Light"/>
        </RadioGroup>
        <Divider variant="middle" /><br/>
        <FormLabel id="node-style-radio-buttons-group-label">Graph Style</FormLabel>
        <RadioGroup
          row
          aria-labelledby="node-style-radio-buttons-group-label"
          name="node-style-radio-buttons-group-row"
          // value={showNodeName}
          // onChange={handleViewChange}
        >
          <FormControlLabel value="3D" control={<Radio color="secondary"/>} label="3D"/>
          <FormControlLabel value="2D" control={<Radio color="secondary"/>} label="2D"/>
        </RadioGroup>
        <Divider variant="middle" /><br/>
        <FormLabel id="node-view-radio-buttons-group-label">Node View</FormLabel>
        <RadioGroup
          row
          aria-labelledby="node-view-radio-buttons-group-label"
          name="node-view-radio-buttons-row"
          value={showNodeName}
          onChange={handleViewChange}
        >
          <FormControlLabel value={false} control={<Radio/>} onClick={refreshPage} label="Sphere"/>
          <FormControlLabel value={true} control={<Radio/>} label="Name"/>
        </RadioGroup>
        <Divider variant="middle" /><br/>
        <FormLabel id="slider-group-label">Max. Nodes per Category</FormLabel>
        <Slider defaultValue={100}
                onChangeCommitted={handleResultsPerNodeLimitChange}
                step={1}
                min={0}
                max={1000}
                valueLabelDisplay="auto" />
      </FormControl>
    </Paper>
  )
}

export default GraphPanel;
