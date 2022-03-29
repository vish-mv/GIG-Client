import * as React from 'react';
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function ValueEditor(props) {
  const {value, setValue} = props;

  function setEntityValue(e) {
    let valueCopy = {...value};
    valueCopy.value_type = e.target.value;
    setValue(valueCopy);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <table width="100%">
        <tbody>
        <tr>
          <td>Value Type:</td>
          <td width="90%">
            <TextField
              variant="outlined"
              size="small"
              multiline
              maxRows={5}
              value={value.value_type}
              onChange={(e) => setEntityValue(e)}
              fullWidth/>
          </td>
        </tr>
        <tr>
          <td>Value String:</td>
          <td>
            <TextField
              variant="outlined"
              size="small"
              multiline
              maxRows={5}
              value={value.value_string}
              onChange={(e) => setEntityValue(e)}
              fullWidth/>
          </td>
        </tr>
        <tr>
          <td>Source:</td>
          <td>
            <TextField
              variant="outlined"
              size="small"
              multiline
              maxRows={5}
              value={value.source}
              onChange={(e) => setEntityValue(e)}
              fullWidth/>
          </td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>
            <TextField
              variant="outlined"
              size="small"
              multiline
              maxRows={5}
              value={value.date}
              onChange={(e) => setEntityValue(e)}
              fullWidth/>
          </td>
        </tr>
        <tr>
          <td>Updated at:</td>
          <td>
            <DateTimePicker
              value={new Date(value)}
              onChange={(e) => setEntityValue(e)}
              fullWidth
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Divider/>
          </td>
        </tr>
        </tbody>
      </table>
    </LocalizationProvider>
  )
}
