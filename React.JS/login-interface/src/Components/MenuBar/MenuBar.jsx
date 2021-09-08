import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuBar = () => {
  const history = useHistory();
  //current user
  const [userUID] = useState(localStorage.getItem("currentUser"));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>

          {userUID ? (
            <>
              <Button
                onClick={() => {
                  history.push("/logout");
                }}
                color="inherit"
              >
                Logout
              </Button>
              <Button onClick={()=>history.push('/table')} color="inherit">Table</Button>
              <Button onClick={()=>history.push('/currency')} color="inherit">Currency Convertor</Button>
              <Button onClick={()=>history.push('/file')} color="inherit">File Upload</Button>
            </>
          ) : (
            <Typography variant="h6" className={classes.title}>
              Login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
