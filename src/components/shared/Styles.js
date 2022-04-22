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
    color: 'rgba(0,0,0,.87)',
    margin:'10px'
  },
  loginButton: {
    textAlign: "right",
    margin: 10,
    right: 0,
    top: 12,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderBottomLeftRadius: '20px',
    borderTopLeftRadius: '20px',
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: "-25px",
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
    border: '0.5px solid #ddd',
    boxShadow:'5px 5 px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    paddingLeft: 10,
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#0000008F',
    width: '100%',
    paddingRight: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

export default Styles;
