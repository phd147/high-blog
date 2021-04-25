import React, {useRef} from 'react';
import {Grid, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";


export default function SearchPage(props){

    const history = useHistory();


    const searchRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const searchValue  = searchRef.current.value ;
        console.log(searchValue);
        history.push(`/search/${searchValue}`);

    }
    console.log('SEARCH PAGE ......')

    return (

            <Grid direction="column" container spacing={3} style={{marginTop : '70px'}}>
                <Grid item xs={12} md={4}>

                </Grid>
                <Grid item xs={12} md={4}>
                    <form  noValidate onSubmit={submitHandler} >

                        <TextField id="outlined-basic" label="Outlined" variant="outlined" inputRef={searchRef} />
                    </form>
                </Grid>
                <Grid item xs={12} md={4}>

                </Grid>

            </Grid>


    )

}