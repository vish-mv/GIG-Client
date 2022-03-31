import React from 'react';
import TextField from "@mui/material/TextField/TextField";
import {ServerDateFormat, ValueTypes} from "@lsflk/gig-client-shared/constants";
import {JsonEditor} from "jsoneditor-react/es";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment/moment'

export default function ValueStringEditor(props) {
  const {value, setEntityValue} = props;

  switch (value?.value_type) {
    case ValueTypes.Date:
      return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          variant="outlined"
          renderInput={(elementProps) => <TextField size="small" {...elementProps} />}
          value={value.value_string}
          onChange={(e) => setEntityValue(moment(e).format(ServerDateFormat), "value_string")}
        />
      </LocalizationProvider>;
    case ValueTypes.HTML:
      return <ReactQuill
        theme="snow"
        value={value.value_string}
        onChange={(e) => setEntityValue(e, "value_string")}
      />;
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
