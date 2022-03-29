import {css} from "@emotion/react";

export const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export const counterProps = {
  start: 0,
  duration: 1,
  separator: ",",
  decimals: 0,
  decimal: ",",
  suffix: " ",
  delay: 0,
};

const Styles = theme => ({
  appBar: {
    backgroundColor: '#282c34'
  },
  grow: {
    flexGrow: 1,
  },
  errorText: {
    textAlign: "centre",
    color: 'red'
  },
  linkButton: {
    textAlign: "centre",
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: '35px',
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      boxShadow: '0 1px 6px rgb(32 33 36 / 28%)'
    },
    marginRight: "-25px",
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
    display: 'flex',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    border: '1px solid #dfe1e5'
  },
  inputRoot: {
    marginTop: '3px',
    color: '#0000008F',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '90%'
  },
  inputInput: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {},
  },
});

export default Styles;
