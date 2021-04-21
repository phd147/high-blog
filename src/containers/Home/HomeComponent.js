
import React from 'react';
import {Container, Grid} from "@material-ui/core";

import classnames from './Home.module.css';

import cs from 'classnames';
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";

export default function Home(props){




    return (
       <Container className={cs(classnames.hb_home)}>

           <Grid className={cs(classnames.hb_home_grid)} container spacing={3} direction="row">
                <Grid className={cs(classnames.hb_menu_grid_item)} item xs={false} md={2}>
                    <Menu/>
                </Grid>
               <Grid item xs={12} md={7} >
                    <Posts/>
               </Grid>

           </Grid>


       </Container>
    )
}