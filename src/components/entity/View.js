import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {Link, useParams} from "react-router-dom";
import {FormattedContentViewer} from "gig-client-shared/components";
import {Styles} from "./Styles";
import {getEntity} from "gig-client-shared/functions";
import {userIsEditAuthorized} from "gig-client-shared/auth";
import {AppRoutes} from "../../routes";
import {Facebook} from 'react-content-loader';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ViewEntity(props) {
  const {titleParam} = useParams();
  const {classes} = props;
  const [loadedEntity, setLoadedEntity] = useState(null);
  const isAuthorized = userIsEditAuthorized();

  useEffect(() => {
    if (!loadedEntity || loadedEntity.title !== titleParam) {
      console.log("get profile entity:", titleParam);
      getEntity(titleParam).then(entity => setLoadedEntity(entity));
    }

  });

  const Accordion = styled((childProps) => (
    <MuiAccordion disableGutters elevation={0} square {...childProps} />
  ))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((childProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
      {...childProps}
    />
  ))(({theme}) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  console.log(loadedEntity);

  const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  return (
    <div className="content">
      <div className={classes.container}>
        <Paper className={classes.searchResult} elevation={6}>
          {loadedEntity ?
            <div>
              <Grid container>
                <Grid item lg={11}>
                  <Typography variant="h4" component="h4">
                    {loadedEntity.title}
                  </Typography>
                </Grid>
                <Grid item lg={1} style={{textAlign: 'right'}}>
                  {isAuthorized &&
                  <Button component={Link} to={AppRoutes.edit + loadedEntity.title} variant="outlined">Edit</Button>
                  }
                </Grid>
              </Grid>
              <table>
                <tbody>
                {Object.entries(loadedEntity?.attributes).map((attribute) => (
                  <tr key={attribute[1]?.name}>
                    <td className="attribute">
                      <Typography>{attribute[1]?.name !== "" ? attribute[1]?.name + ": " : ""}</Typography></td>
                    <td>
                      {attribute[1]?.values.map((attributeValue, index) => (
                        <Accordion key={attribute[1]?.name + index} defaultExpanded={true}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            Changed value since: {new Date(attributeValue?.date).toLocaleString()} | 
                            Source: {attributeValue?.source}
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormattedContentViewer
                              key={attribute[1]?.name} childKey={attribute[1]?.name} content={attributeValue}
                              highlightTags={loadedEntity?.links?.map((link) => link.title)}
                              entityRoute={AppRoutes.entity}
                            />
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="attribute">
                    Links:
                  </td>
                  <td>
                    {loadedEntity?.links?.map((link) => (
                      <Chip
                        key={link.title}
                        label={link.title}
                        to={AppRoutes.entity + link.title + "?date=" + link.dates[0]}
                        clickable
                        component={Link}
                      />
                    ))}</td>
                </tr>
                <tr>
                  <td className="attribute">
                    Categories:
                  </td>
                  <td>
                    {loadedEntity?.categories?.map((title) => (
                      <Chip
                        key={title}
                        label={title}
                        variant="outlined"
                        to={AppRoutes.search + title + ':'}
                        clickable
                        component={Link}
                      />
                    ))}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            :
            <Typography component="p">
              <Facebook/>
            </Typography>
          }
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(Styles)(ViewEntity);
