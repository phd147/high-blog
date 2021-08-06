import React, {useRef, useCallback, useState} from "react";

import {toast} from "react-toastify";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "query-string";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

import LoginService from "./login.service";
import MetaTag from "../../components/MetaTag";

// action toast

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                DUT TEAM
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
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

export default function SignInSide() {
    const classes = useStyles();

    const username = useRef();
    const password = useRef();

    const history = useHistory();
    const location = useLocation();

    const [checked, setCheck] = useState(false);

    const loginHandler = useCallback(async () => {
        console.log(username.current.value);
        console.log(password.current.value);
        console.log(checked);

        try {
            const res = await LoginService.loginHandle(
                username.current.value,
                password.current.value
            );

            console.log(res);

            localStorage.setItem("dut-accessToken", res.data.accessToken);
            localStorage.setItem("dut-refreshToken", res.data.refreshToken);
            setTimeout(() => {
                // history.replace('/');

                const {redirect} = queryString.parse(location.search);
                history.push(redirect == null ? "/" : redirect);
            }, 2000);

            toast.success("LOGIN SUCCESSFUL");
        } catch (err) {
            console.log(err);
            toast.error('LOGIN FAILED')
            //toast.error(err.response.data.message);
        }
    }, []);

    return (
        <Grid
            style={{marginTop: "-70px"}}
            container
            component="main"
            className={classes.root}
        >
            <MetaTag>Login</MetaTag>
            <CssBaseline/>
            <Grid item xs={12} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            inputRef={username}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="User Name"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            inputRef={password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => {
                                e.preventDefault();
                                loginHandler();
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}
                                      onClick={() => history.push('/register')} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
