import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import styles from "./SocialButtons.module.css";

const SocialButtons = (props) => (
  <div className={styles.container}>
    <FacebookShareButton url={props.url} quote={props.text}>
      <IconButton aria-label="facebook">
        <FacebookIcon />
      </IconButton>
      {/* <Button>
        <img
          alt=""
          src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png"
        />
      </Button> */}
    </FacebookShareButton>

    <TwitterShareButton url={props.url} title={props.text}>
      <IconButton aria-label="facebook">
        <TwitterIcon />
      </IconButton>
    </TwitterShareButton>
  </div>
);

export default SocialButtons;
