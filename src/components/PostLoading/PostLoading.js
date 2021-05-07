import React from 'react';

import {Skeleton} from "@material-ui/lab";
import {Avatar, Box, Typography} from "@material-ui/core";


export default function PostLoading(props) {

    return (


        <div>


            <Box display="flex" alignItems="center">
                <Box margin={1}>

                    <Skeleton variant="circle">
                        <Avatar/>
                    </Skeleton>

                </Box>
                <Box width="100%">

                    <Skeleton width="100%">
                        <Typography>.</Typography>
                    </Skeleton>

                </Box>
            </Box>

            <Skeleton variant="rect" width="100%">
                <div style={{paddingTop: '40%'}}/>
            </Skeleton>
        </div>
    )
}