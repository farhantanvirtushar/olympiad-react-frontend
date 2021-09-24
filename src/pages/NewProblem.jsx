import React from "react";
import { useParams } from "react-router-dom";
import { updateUser, getUser } from "../User";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

const getOlympiad = async (setOlympiad, id) => {
  const res = await axios.get("/api/olympiads/" + id);

  setOlympiad(res.data);
};

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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  formLabel: {
    marginRight: 5,
  },
  submit: {
    alignSelf: "center",
  },
}));

export default function NewProblem() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  let user = getUser();

  const [olympiad, setOlympiad] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ans, setAns] = useState(0);
  const [points, setPoints] = useState(0);

  const handleSaveProblem = async () => {
    let data = {
      olympiadID: id,
      title: title,
      description: description,
      ans: ans,
      points: points,
    };
    try {
      await axios.post("/api/problems", data);
      history.push("/edit/olympiad/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOlympiad(setOlympiad, id);
  }, [id]);
  return (
    <div>
      <Container maxWidth="md">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {olympiad.title}
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Problem Title"
            autoFocus
            onChange={(event) => setTitle(event.target.value)}
            className={classes.formRow}
          />
          <TextField
            name="description"
            variant="outlined"
            multiline
            required
            fullWidth
            id="description"
            label="Problem Description"
            autoFocus
            onChange={(event) => setDescription(event.target.value)}
            className={classes.formRow}
          />
          <div className={classes.formRow}>
            <TextField
              name="ans"
              variant="outlined"
              required
              fullWidth
              id="ans"
              label="Ans (Real Number)"
              autoFocus
              onChange={(event) => setAns(Number(event.target.value))}
            />
            <TextField
              name="points"
              variant="outlined"
              required
              fullWidth
              id="points"
              label="Points"
              autoFocus
              onChange={(event) => setPoints(Number(event.target.value))}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProblem}
          >
            Save
          </Button>
        </div>
      </Container>
    </div>
  );
}
