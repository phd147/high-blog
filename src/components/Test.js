import React from 'react';

// dispatch and selector 
import {useDispatch,useSelector} from 'react-redux';

// material ui 
import {Grid,Container,Button} from '@material-ui/core';

// aciton import 
import {changeCount} from '../store/action/thunks/thunkExample';

// import react  toasify 
//import  'react-toastify/dist/ReactToastify.css';

//import { ToastContainer } from 'react-toastify';

const Test = props => {

    const dispatch = useDispatch();
    const count = useSelector(state => state.one.count);

    const name = useSelector(state => state.user.name);
    const username = useSelector(state => state.user.userName);
    const role = useSelector(state => state.user.role);


    return (
        <div>
            <Container>
            {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                            <Button onClick={() => dispatch(changeCount())} >
                                click to add count
                            </Button>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        hi
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {count}
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <h1>name : {name} </h1>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <h2>user name : {username} </h2>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <ul>
                            {role.map(el => <li key={el}>{el}</li>)}
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};

export default Test ;