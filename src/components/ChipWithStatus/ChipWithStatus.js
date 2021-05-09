import React from 'react';
import {Chip} from "@material-ui/core";
import {CANCELED, CREATED, FAILED, FINISHED, IN_PROGRESS} from "../../constant";


export default function ChipWithStatus({status}) {

    let color = '';

    switch(status) {
        case FINISHED.text :
            color = FINISHED.color
            break;
        case CREATED.text :
            color = CREATED.color
            break;
        case IN_PROGRESS.text :
            color = IN_PROGRESS.color
            break ;
        case FAILED.text :
            color = FAILED.color ;
            break ;
        case CANCELED.text :
            color = CANCELED.color ;
            break ;
        default :
            color = '';
    }


    return (
        <Chip size="small" label={status} style={{backgroundColor: color, color : 'white',fontWeight : 'bold'}}/>
    )
}