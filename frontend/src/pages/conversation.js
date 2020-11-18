import React from "react";
import {
  withStyles,
  Typography,
  Box,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";

const TextTypography = withStyles({
  root: {
    color: "#373a3c",
    whiteSpace: "pre-line",
  },
})(Typography);

const useStyles = makeStyles((theme) => ({
  textBox: {
    overflowY: "auto",
    maxHeight: window.innerHeight * 0.6,
    marginTop: theme.spacing(4),
    borderRadius: "5px",
    boxShadow: "0px 0px 2px",
  },
}));

// placeholder text
const introText = "Stakeholder's response";

function Conversation({ showStakeholders, setShowStakeholders, stakeholder }) {
    function goToStakeholders() {
        setShowStakeholders(true);
    }
  
    const classes = useStyles();
  
    return (
      <div>
        <Box mt={5}>
          <Grid container direction="row" justify="center" alignItems="center">
            <TextTypography variant="h4" align="center" gutterBottom>
              {stakeholder.name}
            </TextTypography>
          </Grid>
        </Box>
        <Grid item style={{ marginLeft: "0rem", marginTop: "-3rem" }}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={goToStakeholders}
            >
              Return
            </Button>
          </Grid>
        <Grid container direction="row" justify="space-between">
          <Grid
            item
            style={{
              marginLeft: "0rem",
              marginRight: "0rem",
              marginTop: "-3rem",
            }}
          >
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Box p={2} className={classes.textBox}>
              <TextTypography variant="body1">{introText}</TextTypography>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
  
export default Conversation;