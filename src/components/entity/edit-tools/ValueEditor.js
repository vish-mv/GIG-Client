import * as React from 'react';
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {ServerDateFormat, ValueTypes} from "@lsflk/gig-client-shared/constants";
import ValueStringEditor from "./ValueStringEditor";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from "moment";

export default function ValueEditor(props) {
  const {value, setValue} = props;

  function setEntityValue(val, attr) {
    let valueCopy = {...value};
    valueCopy[attr] = val;
    setValue(valueCopy);
  }

  return (
    <table width="100%">
      <tbody>
      <tr>
        <td>Value Type:</td>
        <td width="90%">
          <Select
            size="small"
            value={value.value_type}
            onChange={(e) => setEntityValue(e.target.value, "value_type")}
          >
            {Object.entries(ValueTypes).map((valueType) => (
              <MenuItem key={valueType[1]} value={valueType[1]}>{valueType[0]}</MenuItem>
            ))}
          </Select>
        </td>
      </tr>
      <tr>
        <td>Value String:</td>
        <td>
          <ValueStringEditor value={value} setEntityValue={setEntityValue}/>
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
            onChange={(e) => setEntityValue(e.target.value, "source")}
            fullWidth/>
        </td>
      </tr>
      <tr>
        <td>Created Date:</td>
        <td>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              variant="outlined"
              renderInput={(props) => <TextField size="small" {...props} />}
              value={value.date}
              onChange={(value) => setEntityValue(moment(value).format(ServerDateFormat), "date")}
            />
          </LocalizationProvider>
        </td>
      </tr>
      <tr>
        <td>Updated at:</td>
        <td>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              variant="outlined"
              renderInput={(props) => <TextField size="small" {...props} />}
              value={value.updated_at}
              onChange={(value) => setEntityValue(moment(value).format(ServerDateFormat), "updated_at")}
            />
          </LocalizationProvider>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <Divider/>
        </td>
      </tr>
      </tbody>
    </table>
  )
}
