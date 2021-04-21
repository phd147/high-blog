import React, {useRef} from 'react';
import {Grid, TextField} from "@material-ui/core";


export default function SearchPage(props){

    const searchRef = useRef();

    const submitHandler = () => {
        console.log(searchRef.current.value);
    }

    return (
        <div>
            <Grid>
                <form  noValidate onSubmit={} >

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" inputRef={searchRef} />
                </form>
            </Grid>

        </div>
    )

}