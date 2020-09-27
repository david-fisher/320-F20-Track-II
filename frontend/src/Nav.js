import React from "react";

import Results from "./pages/results";
import App from "./App";
import RadarTest from "./pages/chartTest";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <div>
          <AppBar position="static" style={{ backgroundColor: "#A80909" }}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link style={{ color: "#FFF" }} to="/">
                  <Button color="inherit">Home</Button>
                </Link>
                <Link style={{ color: "#FFF" }} to="/results">
                  <Button color="inherit">Results</Button>
                </Link>
                <Link style={{ color: "#FFF" }} to="/chartTest">
                  <Button color="inherit">Chart</Button>
                </Link>
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <App />
            </Route>
            <Route path="/results" exact>
              <Results />
            </Route>
            <Route path="/chartTest" exact>
              <RadarTest />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Nav;
