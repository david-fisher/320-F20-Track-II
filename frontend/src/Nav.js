import React from "react";

import Feedback from "./pages/feedback";
import Home from "./pages/home";
import RadarTest from "./pages/chartTest";
import InitialReflection from "./pages/initialReflection";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SimulationWindow from "./pages/simulationWindow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: "#ced4da",
  },
  title: {
    flexGrow: 1,
    color: "#FFF",
  },
  link: {
    "&:hover": {
      color: "#000000",
      textDecoration: "none",
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#881c1c",
    },
  },
  background: {
    color: '#444e58'
  }
});

const menuItems = [
  {
    listText: "Home",
    listPath: "/",
  },
  {
    listText: "Feedback",
    listPath: "/feedback",
  },
  {
    listText: "Simulation Window",
    listPath: "/simulation",
  },
  {
    listText: "Chart",
    listPath: "/chartTest",
  },
];

function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <div>
          <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
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
                  <Link className={classes.link} to="/">
                    <Button className={classes.title} color="inherit">
                      Home
                    </Button>
                  </Link>
                  <Link className={classes.link} to="/feedback">
                    <Button className={classes.title} color="inherit">
                    Feedback
                    </Button>
                  </Link>
                  <Link className={classes.link} to="/simulation">
                    <Button className={classes.title} color="inherit">
                      Simulation Window
                    </Button>
                  </Link>
                  <Link className={classes.link} to="/chartTest">
                    <Button className={classes.title} color="inherit">
                      Chart
                    </Button>
                  </Link>
                </Typography>
                <Button color="inherit">LogOut</Button>
              </Toolbar>
            </AppBar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/feedback" exact>
              <Feedback />
            </Route>
            <Route path="/simulation" exact>
              <SimulationWindow />
            </Route>
            <Route path="/chartTest" exact>
              <RadarTest />
            </Route>
          </Switch>
          </ThemeProvider>
        </div>
      </Router>
    </div>
  );
}

export default Nav;
