import React, { useState } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import voteStyles from "./Vote.module.css";
import { useSelector } from "react-redux";

Vote.propTypes = {
  onVoteChange: PropTypes.func,
};
Vote.defaultProps = {
  onVoteChange: null,
};

function Vote(props) {
  const { onVoteChange } = props;

  const postDetails = useSelector((state) => state.postDetails);
  const { payload, isLoading, error } = postDetails;
  const { vote } = payload;

  console.log("post vote: ", vote);
  const handleVoteUp = () => {
    if (onVoteChange) {
      if (vote === undefined) {
        onVoteChange("UP", "CREATE");
      } else if (vote.voteType === "UP") {
        onVoteChange("UP", "DELETE");
      } else if (vote.voteType === "DOWN") {
        onVoteChange("UP", "UPDATE");
      }
    }
  };
  const handleVoteDown = () => {
    if (onVoteChange) {
      if (vote === undefined) {
        onVoteChange("DOWN", "CREATE");
      } else if (vote.voteType === "DOWN") {
        onVoteChange("DOWN", "DELETE");
      } else if (vote.voteType === "UP") {
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
            vote
              ? vote.voteType === "UP"
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
        style={vote ? voteStyles.voteValueActived : {}}
      >
        {payload.numberOfVotes > 0
          ? `+${payload.numberOfVotes}`
          : payload.numberOfVotes}
      </div>
      <div>
        <IconButton
          className={voteStyles.vote__btn}
          aria-label="downvote"
          onClick={handleVoteDown}
          style={
            vote
              ? vote.voteType === "DOWN"
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
