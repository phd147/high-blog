import React from "react";
import PropTypes from "prop-types";
import { Button } from "bootstrap";

Cons.propTypes = {
  onClick: PropTypes.func,
};
Cons.defaultProps = {
  onClick: null,
};

function Cons(props) {
  const { onClick } = props;
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default Cons;
