import React, { useState } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import voteStyles from "./Vote.module.css";
import { useSelector } from "react-redux";

Vote.propTypes = {
  current: PropTypes.any,
  numberOfVotes: PropTypes.number,
  onVoteChange: PropTypes.func,
};
Vote.defaultProps = {
  current: null,
  numberOfVotes: 0,
  onVoteChange: null,
};

function Vote(props) {
  const { current, numberOfVotes, onVoteChange } = props;

  // const postDetails = useSelector((state) => state.postDetails);
  // const { payload, isLoading, error } = postDetails;
  // const { vote } = payload;

  console.log("CURRENT: ", current);
  const handleVoteUp = () => {
    if (onVoteChange) {
      if (current === null) {
        onVoteChange("UP", "CREATE");
      } else if (current.voteType === "UP") {
        onVoteChange("UP", "DELETE");
      } else if (current.voteType === "DOWN") {
        onVoteChange("UP", "UPDATE");
      }
    }
  };
  const handleVoteDown = () => {
    if (onVoteChange) {
      if (current === null) {
        onVoteChange("DOWN", "CREATE");
      } else if (current.voteType === "DOWN") {
        onVoteChange("DOWN", "DELETE");
      } else if (current.voteType === "UP") {
        onVoteChange("DOWN", "UPDATE");
      }
    }
  };
  const styles = {
    voteIconActived: {
      fill: "#039703",
    },
    voteIconNonActived: {
      fill: "#919191",
    },
    voteValueActived: {
      color: "#002984",
    },
  };

  return (
    <div className={voteStyles.vote__container}>
      <div>
        <IconButton
          className={voteStyles.vote__btn}
          aria-label="upvote"
          onClick={handleVoteUp}
          style={
            current
              ? current.voteType === "UP"
                ? styles.voteIconActived
                : styles.voteIconNonActived
              : styles.voteIconNonActived
          }
        >
          <KeyboardArrowUpIcon class={voteStyles.vote__icon} />
        </IconButton>
      </div>
      <div
        className={voteStyles.vote__value}
        style={current ? voteStyles.voteValueActived : {}}
      >
        {numberOfVotes > 0 ? `+${numberOfVotes}` : numberOfVotes}
      </div>
      <div>
        <IconButton
          className={voteStyles.vote__btn}
          aria-label="downvote"
          onClick={handleVoteDown}
          style={
            current
              ? current.voteType === "DOWN"
                ? styles.voteIconActived
                : styles.voteIconNonActived
              : styles.voteIconNonActived
          }
        >
          <KeyboardArrowDownIcon class={voteStyles.vote__icon} />
        </IconButton>
      </div>
    </div>
  );
}

export default Vote;
