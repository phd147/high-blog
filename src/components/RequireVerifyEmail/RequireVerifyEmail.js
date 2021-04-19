import React from 'react';

import {Alert} from '@material-ui/lab'


export default function RequireVerifyEmail(props){

    return (
       <Alert severity="warning">
            Please verify your email at <a href="https://mail.google.com/mail/u/0/?ogbl#inbox">here </a>
       </Alert>
    )
}