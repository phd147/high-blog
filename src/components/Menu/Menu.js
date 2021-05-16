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
  const { home, favorites, questions, tags, followings } = props;
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className={classnames.hb_menu}>
      <Paper variant="outlined">
        <MenuList>
          <MenuItem style={{ backgroundColor: home ? "#0984e3" : "" }}>
            <Link to="/">
              <ListItemIcon>
                <HomeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography style={{ color: home ? "white" : "black" }} variant="inherit">Home</Typography>
            </Link>
          </MenuItem>
          <MenuItem style={{ backgroundColor: favorites ? "#0984e3" : "" }}>
            <Link to="/favorites">
              <ListItemIcon>
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography style={{ color: favorites ? "white" : "black" }}  variant="inherit">Favorite</Typography>
            </Link>
          </MenuItem>
          <MenuItem style={{ backgroundColor: questions ? "#0984e3" : "" }}>
            <Link to="/questions">
              <ListItemIcon>
                <QuestionAnswerOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography style={{ color: questions ? "white" : "black" }}  variant="inherit">Question</Typography>
            </Link>
          </MenuItem>
          <MenuItem style={{ backgroundColor: tags ? "#0984e3" : "" }}>
            <Link to="/tags">
              <ListItemIcon>
                <LabelOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography style={{ color: tags ? "white" : "" }}  variant="inherit">Tags</Typography>
            </Link>
          </MenuItem>
          <MenuItem style={{ backgroundColor: followings ? "#0984e3" : "" }}>
            <Link to="/followings">
              <ListItemIcon>
                <ImportContactsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography style={{ color: followings ? "white" : "" }}  variant="inherit">Followed</Typography>
            </Link>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
