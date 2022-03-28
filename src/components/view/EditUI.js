import * as React from 'react';
import Typography from "@mui/material/Typography/Typography";
import {FormattedContentViewer} from "@lsflk/gig-client-shared/components";
import {AppRoutes} from "../../routes";
import Chip from "@mui/material/Chip/Chip";

export default function EditUI(props) {
  const {entity} = props;

  return (
    <div>
      <table>
        <tbody>
        {Object.entries(entity?.attributes).map((attribute) => (
          <tr key={"tr_edit" + attribute[1]?.name}>
            <td className="attribute">
              <Typography>{attribute[1]?.name !== "" ? attribute[1]?.name + ": " : ""}</Typography></td>
            <td>
              {attribute[1]?.values.map((attributeValue) => (
                <FormattedContentViewer
                  key={"edit" + attributeValue.updated_at} content={attributeValue}
                  highlightTags={entity?.links?.map((link) => link.title)}
                  entityRoute={AppRoutes.entity}
                />
              ))}
            </td>
          </tr>
        ))}
        <tr>
          <td>
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
          <td>
            Categories:
          </td>
          <td>
            {entity?.categories?.map((title) => (
              <Chip
                key={title}
                label={title}
                variant="outlined"
                href={AppRoutes.search + title + ':'}
                clickable
                component="a"
              />
            ))}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
