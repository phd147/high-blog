import React from 'react';
import {Button} from "@material-ui/core";


export default function LoginCom(props){
    console.log(props.loginFunc)

    return (
        <div>
            <Button onClick={props.loginFunc} variant={"contained"} color={"primary"}>
                click to login
            </Button>
        </div>
    )
}