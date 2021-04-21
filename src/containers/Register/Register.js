import React, {useCallback, useRef,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import ToastContainer from '../../configs/toast/ToastContainerConfig';
import {toast} from 'react-toastify';


// import api
import RegisterAPI from './Register.service';

import {useHistory} from 'react-router-dom';





/// react router

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.facebook.com/bk.bop19/">
               High Blog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {

    const [genderType,setGender] = useState('MALE');

    const classes = useStyles();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const nicknameRef = useRef();

    const history = useHistory();

    const onChangeGender = useCallback((e)=> {
        setGender(e.target.value);
    })

    const register = useCallback(async () => {
      const registerData = {
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value,
          email : emailRef.current.value,
          username : usernameRef.current.value,
          password : passwordRef.current.value ,
          returnUrl : 'http://localhost:3000/verfigy-register/code',
          nickName : nicknameRef.current.value,
          genderType : genderType
      };

        try {
            const res = await RegisterAPI.register(registerData);
            console.log(res);
            setTimeout(() => {
                history.push('/login')

            },2000)
            toast.success("Please verify your email")

        }
        catch(err){

            console.log(err.response.data.message);
            toast.error(err.response.data.message);
        }



    },[])



    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer/>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={firstNameRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={lastNameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="nickname"
                                label="Nick name"
                                name="nickname"
                                autoComplete="email"
                                inputRef={nicknameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={genderType} onChange={onChangeGender}>
                                    <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                    <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Username"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={usernameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={passwordRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => {
                            e.preventDefault();
                            register();
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
