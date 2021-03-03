import React,{useCallback} from 'react';


import {Button} from '@material-ui/core';

//router history 
import {useHistory} from 'react-router-dom';

const Login = props => {
    const history = useHistory();

    
    const loginHandler = useCallback(() => {
        localStorage.setItem('dut-accessToken','phdddd');
        try {
            history.replace('/1')
        }catch(err){
            console.log(err);
        }
    },[history])

    return (
        <div>
            <Button onClick={loginHandler}>click to login</Button>
        </div>
    )
};


export default Login ;