import React, { useCallback, useState, useRef } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import noteImage from "../static/images/computer.jpg";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${noteImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signup({ history }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef("form");

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  const createUser = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        console.log(error);

        setError(true);
        setLoginResponse(error.message);
        setEmail("");
        setPassword("");
      }
    },
    [email, history, password]
  );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            MY-NOTES APP
          </Typography>
          <Avatar className={classes.avatar}>
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <ValidatorForm
            ref={inputRef}
            className={classes.form}
            onSubmit={createUser}
          >
            <div>
              {error && (
                <Alert severity="error">
                  <AlertTitle>Sign up Error</AlertTitle>
                  {loginResponse} — <strong>Try again!</strong>
                </Alert>
              )}
            </div>
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={handleEmailInput}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              validators={["required"]}
              errorMessages={["Your email address is required"]}
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={handlePasswordInput}
              name="password"
              label="Password"
              type="password"
              id="password"
              validators={["required"]}
              errorMessages={["Your password is required"]}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<AssignmentIndIcon />}
              className={classes.submit}
            >
              Sign up
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Back to login"}
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(Signup);
