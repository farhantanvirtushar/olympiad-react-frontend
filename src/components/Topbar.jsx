import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { getUser } from "../User";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  let user = getUser();
  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            <HomeIcon />
            Home
          </Button>

          <Button color="inherit" component={Link} to={"/profile/" + user._id}>
            <PersonIcon />
            Profile
          </Button>

          <Button color="inherit" component={Link} to="/new/olympiad">
            <AddIcon />
            Create New Olympiad
          </Button>

          <Button color="inherit" onClick={handleLogOut}>
            <ExitToAppIcon />
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
