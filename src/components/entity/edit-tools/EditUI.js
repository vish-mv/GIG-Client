import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import {AppRoutes} from "../../../routes";
import Chip from "@mui/material/Chip/Chip";
import TextField from "@mui/material/TextField";
import ValueEditor from "./ValueEditor";
import ChipInput from 'material-ui-chip-input'

export default function EditUI(props) {
  const {entity, setEntity} = props;

  return (
    <div>
      <table style={{width: '100%'}}>
        <tbody>
        {["title", "image_url", "source", "source_signature", "snippet", "search_text", "created_at", "updated_at"].map((attribute) => (
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
        {Object.entries(entity?.attributes).map((attribute, attributeIndex) => {
          let attributeName = attribute[1]?.name;
          return <tr key={"tr_edit" + attributeName + attributeIndex}>
            <td className="attribute">
              <Typography>{attributeName !== "" ? attributeName + ": " : ""}</Typography></td>
            <td>
              {attribute[1]?.values.map((attributeValue, valueIndex) => (
                <ValueEditor
                  key={"edit" + attributeValue.updated_at + valueIndex} value={attributeValue} setValue={(value) => {
                  let entityCopy = {...entity};
                  entity.attributes[attributeName].values[valueIndex] = value;
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
            {entity?.links?.map((link) => (
              <Chip
                key={link.title}
                label={link.title}
                href={AppRoutes.entity + link.title + "?date=" + link.dates[0]}
                clickable
                component="a"
              />
            ))}</td>
        </tr>
        <tr>
          <td className="attribute">
            Categories:
          </td>
          <td>
            <ChipInput
              value={entity?.categories}
              onAdd={(chip) => {
                let entityCopy = {...entity};
                entityCopy.categories = [...entityCopy.categories, chip];
                setEntity(entityCopy);
              }}
              onDelete={(chip, index) => {
                let entityCopy = {...entity};
                delete entityCopy.categories[index];
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
