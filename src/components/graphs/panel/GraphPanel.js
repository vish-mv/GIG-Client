import React from "react"
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';


const panelUI = {
  position: 'absolute',
  margin: 2,
  top: '100px',
  padding: 2
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
        <FormLabel id="demo-radio-buttons-group-label">Node View</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={showNodeName}
          onChange={handleViewChange}
        >
          <FormControlLabel value={false} control={<Radio/>} onClick={refreshPage} label="Sphere"/>
          <FormControlLabel value={true} control={<Radio/>} label="Name"/>
        </RadioGroup>
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
