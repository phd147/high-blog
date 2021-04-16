import React, { useState } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import "./Vote.css";
Vote.propTypes = {
  vote: PropTypes.number,
  onVoteChange: PropTypes.func,
};
Vote.defaultProps = {
  vote: 0,
  onVoteChange: null,
};

function Vote(props) {
  const { vote, onVoteChange } = props;
  const [isVoted, setIsVoted] = useState(false);

  const handleVote = (type) => {
    if (onVoteChange) onVoteChange(type);
  };

  return (
    <div className="vote__container">
      <div>
        <IconButton aria-label="upvote" onClick={() => handleVote("UP")}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </div>
      <div>{vote}</div>
      <div>
        <IconButton aria-label="downvote" onClick={() => handleVote("DOWN")}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Vote;
