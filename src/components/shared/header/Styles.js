import {css} from "@emotion/react";
import Color from "color";

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

export const Styles = theme => ({
  appBar: {
    backgroundColor: '#282c34'
  },
  grow: {
    flexGrow: 1,
  },
  loginButton: {
    fontSize: 14,
    textAlign: "right",
    margin: 10,
    position: "absolute",
    right: 0,
    top: 12,
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Color(theme.palette.common.white).alpha(0.15).string(),
    '&:hover': {
      backgroundColor: Color(theme.palette.common.white).alpha(0.25).string(),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  customChipPrimary: {
    margin: theme.spacing.unit,
  },
  customChip: {
    margin: theme.spacing.unit,
    color: "#a42e7f",
    border: "1px solid #a42e7f"
  },
  customChip2: {
    margin: theme.spacing.unit,
    color: "#ef6564",
    border: "1px solid #ef6564"
  }
});
