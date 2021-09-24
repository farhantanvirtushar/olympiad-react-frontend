import React from "react";
import { useParams } from "react-router-dom";
import { updateUser, getUser } from "../User";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import ViewProblem from "../components/ViewProblem";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  formLabel: {
    marginRight: 5,
  },
  submit: {
    alignSelf: "center",
  },
}));

const getOlympiad = async (setOlympiad, id, setProblems) => {
  const res = await axios.get("/api/olympiads/" + id);

  setOlympiad(res.data);
  setProblems(res.data.problems);
};

export default function ViewOlympiad() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  let user = getUser();

  const [olympiad, setOlympiad] = useState({});
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getOlympiad(setOlympiad, id, setProblems);
  }, [id]);
  return (
    <div>
      <Container maxWidth="md">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.formRow}>
            {olympiad.title}
          </Typography>
          {problems.map((item) => (
            <ViewProblem key={item} id={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
