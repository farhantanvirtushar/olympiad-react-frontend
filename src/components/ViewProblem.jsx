import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 5,
  },
}));

const getProblem = async (setProblem, setTitle, id) => {
  try {
    let res = await axios.get("/api/problems/" + id);
    setProblem(res.data);
    setTitle(res.data.title);
  } catch (error) {}
};
export default function ViewProblem(props) {
  const classes = useStyles();
  let history = useHistory();
  const [problem, setProblem] = useState({ _id: "" });
  const [title, setTitle] = useState("");

  const handleViewProblemDetails = async () => {
    history.push("/problem/submit/" + problem._id);
  };
  useEffect(() => {
    getProblem(setProblem, setTitle, props.id);
  }, [props]);
  return (
    <Button
      variant="contained"
      fullWidth
      className={classes.paper}
      onClick={handleViewProblemDetails}
    >
      <Typography component="h1" variant="h6">
        {title}
      </Typography>
    </Button>
  );
}
