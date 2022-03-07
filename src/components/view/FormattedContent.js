import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {withStyles} from '@mui/styles';

const styles = theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
  },
  searchResult: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: 'black',
    textAlign: 'left',
    margin: '10px',
  },
  paragraph: {
    margin: '15px 0'
  },
  link: {
    paddingRight: '10px'
  }
});

class FormattedContent extends Component {

  formatValues(values) {
    return values.map(value => {
      return this.formatValue(value);
    })

  }

  formatValue(value) {
    switch (value.value_type) {
      case "date":
        return this.formatDate(value.value_string);
      case "wikiText":
        return this.formatWikiText(value.value_string);
      case "html":
        return this.viewAsHTML(value.value_string);
      default:
        return <Typography key={value.value_string + value.date}>{value.value_string.split('\n').map(item => {
          return <span key={item}>{item}<br/></span>
        })} {value.date}</Typography>;
    }
  }

  formatDate(dateString) {
    return <Typography key={dateString}>{new Date(dateString).toDateString()}</Typography>;
  }

  formatWikiText(textString) {
    return textString.split('\n').map((item, i) => {
      if ((item.match(/=/g) || []).length === 4) {
        return <Typography variant="h5" component="h5" key={i}>{item.replace(/=/g, '')}</Typography>;
      } else if ((item.match(/=/g) || []).length === 6) {
        return <Typography variant="h6" component="h6" key={i}>{item.replace(/=/g, '')}</Typography>;
      } else {
        return <Typography component="p" className={this.props.classes.paragraph}
                           key={i}>{item.replace(/=/g, '')}</Typography>
      }
    });
  }

  viewAsHTML(htmlString) {
    return <Typography key={"html"} dangerouslySetInnerHTML={{__html: htmlString}}/>
  }

  render() {
    const {content} = this.props;
    return (
      <tr key={content.name}>
        <td><Typography>{content.name !== "" ? content.name + ": " : ""}</Typography></td>
        <td>{this.formatValues(content.values)}</td>
      </tr>
    );
  }
}

FormattedContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormattedContent);
