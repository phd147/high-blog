import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import ToggleButton from "@material-ui/lab/ToggleButton";
import PropTypes from "prop-types";
import React from "react";
import styless from "./BookmarkButton.module.css";

BookmarkButton.propTypes = {
  added: PropTypes.bool,
  onClick: PropTypes.func,
};
BookmarkButton.defaultProps = {
  added: false,
  onClick: null,
};

const mytheme = createMuiTheme({
  overrides: {
    MuiToggleButton: {
      root: {
        "&$selected": {
          border: "2px solid #757ce8",
        },
      },
    },
  },
});
function BookmarkButton(props) {
  const { onClick, added } = props;
  const handleClick = () => {
    if (onClick) {
      if (added === true) {
        onClick("DELETE");
      } else if (added === false) {
        onClick("CREATE");
      }
    }
  };

  return (
    <ThemeProvider theme={mytheme}>
      <ToggleButton
        value="check"
        selected={added}
        onChange={handleClick}
        style={{ borderRadius: "50%" }}
      >
        {added ? (
          <BookmarkIcon className={styless.btn_icon_selected} />
        ) : (
          <BookmarkBorderSharpIcon className={styless.btn_icon} />
        )}
      </ToggleButton>
    </ThemeProvider>
  );
}

export default BookmarkButton;
