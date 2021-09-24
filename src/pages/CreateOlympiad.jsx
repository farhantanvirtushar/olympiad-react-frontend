import React from "react";
import { useContext, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getUser } from "../User";
import axios from "axios";
import Moment from "moment";
import { Redirect, useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  },
  formLabel: {
    marginRight: 5,
  },
  submit: {
    alignSelf: "center",
  },
}));

export default function Register() {
  Moment.locale("en");
  let history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [startDate, handleStartDate] = useState(new Date());
  const [finishDate, handleFinishDate] = useState(new Date());

  let user = getUser();

  const submitHandler = async () => {
    const data = {
      createdBy: user._id,
      title: title,
      startTime: startDate,
      finishTime: finishDate,
    };
    try {
      let res = await axios.post("/api/olympiads", data);
      history.push("/edit/olympiad/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Olympiad
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.formRow}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  label="Start Time"
                  variant="inline"
                  value={startDate}
                  onChange={handleStartDate}
                  disablePast
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} className={classes.formRow}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  label="Finish Time"
                  variant="inline"
                  value={finishDate}
                  onChange={handleFinishDate}
                  disablePast
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" onClick={submitHandler}>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
