import React from "react";
import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";

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
  row: {
    margin: 10,
  },

  submit: {
    alignSelf: "center",
  },
}));

const getProblem = async (setProblem, id) => {
  try {
    let res = await axios.get("/api/problems/" + id);
    setProblem(res.data);
  } catch (error) {}
};

export default function SubmitProblem() {
  const classes = useStyles();
  const { id } = useParams();
  const [problem, setProblem] = useState({ title: "" });

  const handleSubmit = async () => {};
  useEffect(() => {
    getProblem(setProblem, id);
  }, []);
  return (
    <div>
      <Container maxWidth="md">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.row}>
            {problem.title}
          </Typography>
          <div className={classes.row}>{problem.description}</div>
          <TextField
            id="outlined-basic"
            label="Ans (Real Number)"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.row}
          >
            submit
          </Button>
        </div>
      </Container>
    </div>
  );
}
