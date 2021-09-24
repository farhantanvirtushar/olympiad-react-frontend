import React from "react";

import Feed from "../components/Feed";
import { Box, Tabs, Tab } from "@material-ui/core";
import { useState } from "react";

import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import Profile from "../components/Profile";
import Topbar from "../components/Topbar";
import CreateOlympiad from "./CreateOlympiad";
import EditOlympiad from "./EditOlympiad";
import NewProblem from "./NewProblem";
import ViewOlympiad from "./ViewOlympiad";
import SubmitProblem from "./SubmitProblem";

export default function Home() {
  let history = useHistory();

  let user = null;
  let remembered = localStorage.getItem("rememberMe") === "true";
  if (remembered) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      return <Redirect to="/login" />;
    }
  }

  return (
    <Router>
      <Switch>
        <Box>
          <Topbar />
          <Route exact path="/">
            <Feed />
          </Route>
          <Route exact path="/olympiad/:id">
            <ViewOlympiad />
          </Route>
          <Route exact path="/new/olympiad">
            <CreateOlympiad />
          </Route>
          <Route exact path="/edit/olympiad/:id/newproblem">
            <NewProblem />
          </Route>
          <Route exact path="/edit/olympiad/:id">
            <EditOlympiad />
          </Route>
          <Route exact path="/problem/submit/:id">
            <SubmitProblem />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Box>
      </Switch>
    </Router>
  );
}
