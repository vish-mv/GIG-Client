import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import ValueEditor from "./ValueEditor";
import ChipInput from 'material-ui-chip-input'
import moment from 'moment/moment'
import {ServerDateFormat, ValueTypes} from "@lsflk/gig-client-shared/constants"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from "@mui/material/Button/Button";

export default function EditUI(props) {
  const {entity, setEntity} = props;

  return (
    <div>
      <table style={{width: '100%'}}>
        <tbody>
        {["title", "image_url", "source", "source_signature", "snippet", "search_text"].map((attribute) => (
          <tr key={"tr_edit" + attribute}>
            <td className="attribute">
              <Typography>{attribute !== "" ? attribute + ": " : ""}</Typography></td>
            <td width="90%">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                multiline
                maxRows={5}
                value={entity[attribute]}
                onChange={(e) => {
                  let entityCopy = {...entity};
                  entityCopy[attribute] = e.target.value;
                  setEntity(entityCopy);
                }}
                fullWidth/>
            </td>
          </tr>
        ))}
        {["created_at", "updated_at"].map((attribute) => (
          <tr key={"tr_edit" + attribute}>
            <td className="attribute">
              <Typography>{attribute !== "" ? attribute + ": " : ""}</Typography></td>
            <td width="90%">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  variant="outlined"
                  renderInput={(props) => <TextField size="small" {...props} />}
                  value={entity[attribute]}
                  onChange={(newValue) => {
                    console.log(newValue);
                    let entityCopy = {...entity};
                    entityCopy[attribute] = moment(newValue).format(ServerDateFormat);
                    setEntity(entityCopy);
                  }}
                />
              </LocalizationProvider>
            </td>
          </tr>
        ))}
        {Object.entries(entity?.attributes).map((attribute, attributeIndex) => {
          let attributeName = attribute[1]?.name;
          return <tr key={"tr_edit" + attributeName + attributeIndex}>
            <td className="attribute">
              <Typography>{attributeName !== "" ? attributeName + ": " : ""}</Typography>
            </td>
            <td>
              <Button variant="outlined" onClick={() => {
                let entityCopy = {...entity};
                entityCopy.attributes[attributeName].values.push({
                  value_type: ValueTypes.String,
                  value_string: "",
                  source: "",
                  date: "",
                  updated_at: "",
                });
                setEntity(entityCopy);
              }}>Add New Value</Button>
              {attribute[1]?.values.map((attributeValue, valueIndex) => (
                <ValueEditor
                  key={"edit" + attributeValue.updated_at + valueIndex} value={attributeValue} setValue={(value) => {
                  let entityCopy = {...entity};
                  entityCopy.attributes[attributeName].values[valueIndex] = value;
                  setEntity(entityCopy);
                }}
                />
              ))}
            </td>
          </tr>
        })}
        <tr>
          <td className="attribute">
            Links:
          </td>
          <td>
            <ChipInput
              chipRenderer={(item, index) => {
                return <Chip
                  variant="outlined"
                  clickable
                  onDelete={() => {
                    let entityCopy = {...entity};
                    entityCopy.links.splice(index, 1);
                    setEntity(entityCopy);
                  }}
                  label={item.value}
                  key={item.value}
                  style={{
                    margin: 2
                  }}
                />
              }}
              value={entity?.links?.map((link) => link?.title)}
              onAdd={(chip) => {
                let entityCopy = {...entity};
                entityCopy.links = [...entityCopy.links, {title: chip, dates: []}];
                setEntity(entityCopy);
              }}
              onDelete={(chip, index) => {

              }}
            />
            <table style={{width: '100%'}}>
              <tbody>
              {entity?.links?.map((link, linkIndex) => {
                return <tr key={linkIndex}>
                  <td>{link?.title}</td>
                  <td width='80%'>
                    <ChipInput
                      chipRenderer={(item, index) => {
                        return <Chip
                          variant="outlined"
                          clickable
                          onDelete={() => {
                            let entityCopy = {...entity};
                            entityCopy.links[linkIndex].dates.splice(index, 1);
                            setEntity(entityCopy);
                          }}
                          label={item.value}
                          key={item.value}
                          style={{
                            margin: 2
                          }}
                        />
                      }}
                      value={link.dates.map((date) => moment(date).format("MM/DD/yyyy hh:mm A"))}
                      onAdd={(chip) => {
                        let entityCopy = {...entity};
                        entityCopy.links[linkIndex].dates = [...entityCopy.links[linkIndex].dates, moment(chip).format(ServerDateFormat)];
                        setEntity(entityCopy);
                      }}
                    />
                  </td>
                </tr>
              })}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className="attribute">
            Categories:
          </td>
          <td>
            <ChipInput
              chipRenderer={(item, index) => {
                return <Chip
                  variant="outlined"
                  clickable
                  onDelete={() => {
                    let entityCopy = {...entity};
                    entityCopy.categories.splice(index, 1);
                    setEntity(entityCopy);
                  }}
                  label={item.value}
                  key={item.value}
                  style={{
                    margin: 2
                  }}
                />
              }}
              value={entity?.categories}
              onAdd={(chip) => {
                let entityCopy = {...entity};
                entityCopy.categories = [...entityCopy.categories, chip];
                setEntity(entityCopy);
              }}
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
