import React from 'react';


// dispatch and selector 
import {useDispatch,useSelector} from 'react-redux';


//action 
import {changeBool} from '../store/action/thunks/thunkExample';

// material ui 
import {Grid,Container,Button} from '@material-ui/core';

const Test = props => {


    const dispatch = useDispatch();
    const bool = useSelector(state => state.two.bool);

    return (
        <div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                            <Button onClick={() => dispatch(changeBool())} variant="contained" color="primary" >
                               click to swtich bool var
                            </Button>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        hi
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {bool ? 'true' : 'false '}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};

export default Test ;