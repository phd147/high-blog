import React from 'react';
import {ListItemIcon, MenuItem, MenuList, Paper, Typography} from "@material-ui/core";

import classnames from './Menu.module.css';


import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';

export default function Menu(props){

    return (

    <div className={classnames.hb_menu}>
        <Paper >
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <HomeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Home</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <FavoriteBorderOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Favorite</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <QuestionAnswerOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" >
                        Question
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <LabelOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" >
                        Tag
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ImportContactsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" >
                        Followed
                    </Typography>
                </MenuItem>
            </MenuList>
        </Paper>
    </div>
     )
}