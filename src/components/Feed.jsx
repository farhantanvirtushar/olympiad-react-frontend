import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import { Link } from "react-router-dom";
import { getUser } from "../User";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
  button: {
    margin: 5,
  },
}));

export default function Feed() {
  const classes = useStyles();
  const history = useHistory();
  Moment.locale("en");
  const user = getUser();
  const [running, setRunning] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);

  const getOlympiads = async () => {
    const res = await axios.get("/api/olympiads/");

    let len = res.data.length;
    let run = [];
    let upcom = [];
    let prev = [];

    var date = new Date();

    console.log(new Date(res.data[0]["startTime"]).getTime());
    console.log(Date.now());

    for (let i = 0; i < len; i++) {
      if (new Date(res.data[i]["startTime"]).getTime() > Date.now()) {
        upcom.push(res.data[i]);
      } else if (new Date(res.data[i]["finishTime"]).getTime() > Date.now()) {
        run.push(res.data[i]);
      } else {
        prev.push(res.data[i]);
      }
    }

    console.log("running : ");
    console.log(run);
    console.log("upcoming : ");
    console.log(upcom);
    console.log("previous : ");
    console.log(prev);

    setRunning(run);
    setUpcoming(upcom);
    setPrevious(prev);
  };

  useEffect(() => {
    getOlympiads();
  }, []);
  return (
    <div>
      <Container maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h2" className={classes.formRow}>
            Math Olympiads
          </Typography>
          <Typography variant="h4" className={classes.formRow}>
            Running
          </Typography>
          {running.length > 0
            ? running.map((item) => (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  component={Link}
                  to={"/olympiad/" + item._id}
                >
                  {item.title}
                </Button>
              ))
            : "No olympiads are running now"}
          <Typography variant="h4" className={classes.formRow}>
            Upcoming
          </Typography>
          {upcoming.length > 0
            ? upcoming.map((item) => (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  component={Link}
                  to={"/olympiad/" + item._id}
                >
                  {item.title}
                </Button>
              ))
            : "No upcoming olympiads"}
          <Typography variant="h4" className={classes.formRow}>
            Previous
          </Typography>

          {previous.length > 0
            ? previous.map((item) => (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  component={Link}
                  to={"/olympiad/" + item._id}
                >
                  {item.title}
                </Button>
              ))
            : "No olympiads are available"}
        </div>
      </Container>
    </div>
  );
}
