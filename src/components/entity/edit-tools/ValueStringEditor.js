import React from 'react';
import TextField from "@mui/material/TextField/TextField";
import {ValueTypes} from "@lsflk/gig-client-shared/constants";
import {JsonEditor} from "jsoneditor-react/es";

export default function ValueStringEditor(props) {
  const {value, setEntityValue} = props;

  switch (value?.value_type) {
    case ValueTypes.JSON:
      return <JsonEditor
        value={value.value_string}
        onChange={(e) => setEntityValue(e.target.value, "value_string")}/>;
    default:
      return <TextField
        variant="outlined"
        size="small"
        multiline
        maxRows={5}
        value={value.value_string}
        onChange={(e) => setEntityValue(e.target.value, "value_string")}
        fullWidth/>
  }


}
