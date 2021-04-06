import React, { useState } from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";
import "./Vote.scss";
const { Component } = React;

const Arrow = ({ direction, ...props }) => (
  <svg viewBox="0 0 28 12" {...props}>
    <polyline
      points={
        direction === "up"
          ? "0.595,11.211 14.04,1.245 27.485,11.211"
          : "27.485,0.803 14.04,10.769 0.595,0.803"
      }
    />
  </svg>
);

Arrow.defaultProps = {
  direction: "up",
};

class NumberColumn extends Component {
  _getNumbers() {
    let numbers = [];
    let i = 0;

    while (i < 10) {
      numbers.push(<div>{i}</div>);
      i++;
    }

    return numbers;
  }

  render() {
    const { current } = this.props;

    return (
      <div className="vote__column">
        <Motion style={{ y: spring(current * 10) }}>
          {({ y }) => (
            <div
              style={{
                transform: `translateY(${-y}%)`,
              }}
            >
              {this._getNumbers()}
            </div>
          )}
        </Motion>
      </div>
    );
  }
}
Vote.propTypes = {
  onVoteChange: PropTypes.func,
};
Vote.defaultProps = {
  onVoteChange: null,
};
export default function Vote(props) {
  const [count, setCount] = useState(15);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const { onVoteChange } = props;

  function _getCount() {
    const counts = count.toString().split("");

    return counts.map((_count) => {
      if (_count === "-") {
        return <span className="vote__column">-</span>;
      } else {
        return <NumberColumn current={parseFloat(_count)} />;
      }
    });
  }

  return (
    <div className="vote">
      <Arrow
        direction="up"
        className="vote__arrow vote__arrow--up"
        onClick={() => {
          if (!upVoted && !downVoted) {
            setCount(count + 1);
            setUpVoted(true);
            setDownVoted(false);
          } else if (upVoted) {
            setCount(count - 1);
            setUpVoted(false);
            setDownVoted(false);
          } else if (downVoted) {
            setCount(count + 2);
            setUpVoted(true);
            setDownVoted(false);
          }
          onVoteChange(count);
        }}
      />
      <div className="vote__columns">{_getCount()}</div>
      <Arrow
        direction="down"
        className="vote__arrow vote__arrow--down"
        onClick={() => {
          if (!downVoted && !upVoted) {
            setCount(count - 1);
            setUpVoted(false);
            setDownVoted(true);
          } else if (downVoted) {
            setCount(count + 1);
            setUpVoted(false);
            setDownVoted(false);
          } else if (upVoted) {
            setCount(count - 2);
            setUpVoted(false);
            setDownVoted(true);
          }
          onVoteChange(count);
        }}
      />
    </div>
  );
}
