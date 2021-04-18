import React, {useCallback, useRef} from 'react';

// material ui
import {Container, Grid, TextField} from '@material-ui/core';

import moment from 'moment';

// logo
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';

import classnames from './Header.module.css';
import {useHistory} from "react-router-dom";

export default function Header(props){

    const history = useHistory();

    const searchInputRef = useRef();


    const greetingHeader = useCallback((m) => {
        var g = null; //return g

        if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

        var split_afternoon = 12 //24hr time to split the afternoon
        var split_evening = 17 //24hr time to split the evening
        var currentHour = parseFloat(m.format("HH"));

        if(currentHour >= split_afternoon && currentHour <= split_evening) {
            g = "afternoon";
        } else if(currentHour >= split_evening) {
            g = "evening";
        } else {
            g = "morning";
        }

        return g;
    },[])


    // component nay se lay user tu redux, neu khong co thi se khong co saved list , profile null

    return (
        <Grid className={classnames.hb_header_container}>


        <Container >
            <Grid className={classnames.hbHeader} container direction="row" justify="space-between" alignItems="center" >
                <Grid item md={6} className="header-logo-section">
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <div style={{'cursor' : 'pointer'}} className={classnames.hb_logo} onClick={() => history.push('/home')} >
                            High Blog
                        </div>
                        <div className={classnames.good_wish}>
                            {'Good ' + greetingHeader(moment())}
                        </div>
                    </Grid>

                </Grid>

                <Grid item md={6} className={classnames.header_tool_section}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <SearchOutlinedIcon className={classnames.header_search_icon}  onClick={() => {
                            console.log(searchInputRef.current.value);
                            history.push(`/search?name=${searchInputRef.current.value}`)
                        }}/>
                        <TextField inputRef={searchInputRef}  id="search-header" label="Search" className={classnames.header_search}/>
                        <BookmarksOutlinedIcon style={{'cursor' :'pointer'}}  onClick={() => history.push('/bookmark')}/>
                    </Grid>
                </Grid>

            </Grid>
        </Container>
        </Grid>

    )

}
