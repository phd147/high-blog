import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import ToggleButton from "@material-ui/lab/ToggleButton";
import "./BookmarkButton.css";

BookmarkButton.propTypes = {
  onClick: PropTypes.func,
};
BookmarkButton.defaultProps = {
  onClick: null,
};

function BookmarkButton(props) {
  const favorite = useSelector((state) => state.favoriteCreate);

  const postDetails = useSelector((state) => state.postDetails);

  const addedToFavorite = postDetails.payload.addedToFavorite;

  const { payload, isLoading, error } = favorite;
  const { onClick } = props;
  const handleClick = () => {
    if (onClick) {
      if (addedToFavorite === true) {
        onClick("DELETE");
      } else if (addedToFavorite === false) {
        onClick("CREATE");
      }
    }
  };

  return (
    <div>
      <ToggleButton
        value="check"
        selected={addedToFavorite}
        onChange={handleClick}
      >
        {addedToFavorite ? (
          <BookmarkIcon fontSize="large" />
        ) : (
          <BookmarkBorderSharpIcon fontSize="large" />
        )}
      </ToggleButton>
    </div>
  );
}

export default BookmarkButton;
