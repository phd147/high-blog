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
  const [selected, setSelected] = useState(false);
  const { payload, isLoading, error } = favorite;
  const { onClick } = props;
  const handleClick = () => {
    if (onClick) onClick();
  };
  useEffect(() => {
    if (payload === 201) setSelected(true);
  }, [payload]);
  return (
    <div>
      <ToggleButton value="check" selected={selected} onChange={handleClick}>
        {selected ? (
          <BookmarkIcon />
        ) : (
          <BookmarkBorderSharpIcon fontSize="medium" />
        )}
      </ToggleButton>
      {/* <IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={handleClick}
      ></IconButton> */}
    </div>
  );
}

export default BookmarkButton;
