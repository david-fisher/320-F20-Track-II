import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function StateTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState("Cat in the Hat");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <FormControl>
          <InputLabel htmlFor="component-simple">reflection 1</InputLabel>
          <Input id="component-simple" value={name} onChange={handleChange} />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="component-simple">reflection 2</InputLabel>
          <Input id="component-simple" value={name} onChange={handleChange} />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="component-simple">reflection 3</InputLabel>
          <Input id="component-simple" value={name} onChange={handleChange} />
        </FormControl>
      </div>
    </form>
  );
}
