import React from 'react';
import {ListItemIcon, MenuItem, MenuList, Paper, Typography} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";

import classnames from './SideBar.module.css';
import cs from "classnames";


export default function SideBar(props){
    return (
            <div className={cs(classnames.hb_sidebar)}>


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
            </div>
    )
}