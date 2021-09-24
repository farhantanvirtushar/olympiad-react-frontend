import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 5,
  },
}));

const getProblemTitle = async (setTitle, id) => {
  try {
    let res = await axios.get("/api/problems/" + id);
    setTitle(res.data.title);
  } catch (error) {}
};
export default function Problem(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");

  useEffect(() => {
    getProblemTitle(setTitle, props.id);
  }, [props]);
  return (
    <Button variant="contained" fullWidth className={classes.paper}>
      <Typography component="h1" variant="h6">
        {title}
      </Typography>
    </Button>
  );
}
