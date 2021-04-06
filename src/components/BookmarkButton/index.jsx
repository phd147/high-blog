import React from "react";
import PropTypes from "prop-types";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import { IconButton } from "@material-ui/core";
BookmarkButton.propTypes = {};

function BookmarkButton(props) {
  return (
    <div>
      <IconButton color="primary" aria-label="add to shopping cart">
        <BookmarkBorderSharpIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default BookmarkButton;
