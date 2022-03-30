import * as React from 'react';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {ServerDateFormat, ValueTypes} from "@lsflk/gig-client-shared/constants";
import ValueStringEditor from "./ValueStringEditor";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from "moment";
import Button from "@mui/material/Button/Button";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
export default function ValueEditor(props) {
  const {value, setValue, onRemove} = props;

  function setEntityValue(val, attr) {
    let valueCopy = {...value};
    valueCopy[attr] = val;
    setValue(valueCopy);
  }

  return (
    <Box style={{padding:'16px', marginBottom:'16px', border:'1px solid #ccc', borderRadius:'4px'}}>
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
          <td>
            <Tooltip title="Remove Value" style={{position:'relative', top:'-21px', right:'-20px'}}><Button size="small" color="error" variant="outlined"
                                                  onClick={onRemove}><CloseIcon/></Button></Tooltip>
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
        </tbody>
      </table>
    </Box>
  )
}
