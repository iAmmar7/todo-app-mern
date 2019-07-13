import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(22, 145, 29)"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(22, 145, 29)"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(66%, 66%, 66%)"
      },
      "&:hover fieldset": {
        borderColor: "rgb(26%, 63%, 28%)"
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(22, 145, 29)"
      }
    },
    textTransform: "capitalize"
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  }
}));

export default function CustomizedInputs(props) {
  const classes = useStyles();

  return (
    <CssTextField
      className={classes.root}
      label="Add to-do"
      variant="outlined"
      id="custom-css-outlined-input"
      type={props.type}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      ref={props.refrence}
    />
  );
}