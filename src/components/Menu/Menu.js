import React from "react";
import {
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@material-ui/core";

import classnames from "./Menu.module.css";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import { Link, useLocation } from "react-router-dom";

export default function Menu(props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className={classnames.hb_menu}>
      <Paper variant = 'outlined'>
        <MenuList>
          <MenuItem>
            <Link to="/" activeClassName={classnames.selected}>
              <ListItemIcon>
                <HomeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Home</Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/favorites" activeClassName={classnames.selected}>
              <ListItemIcon>
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Favorite</Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/questions">
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Question</Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tags">
              <ListItemIcon>
                <LabelOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Tags</Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/followings">
              <ListItemIcon>
                <ImportContactsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Followed</Typography>
            </Link>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
