import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Cons from "./Cons";

Cha.propTypes = {};

function Cha(props) {
  const [value, setValue] = useState("");
  const handleClickFromCha = () => {
    console.log("Ok chua");
  };
  return (
    <div style={{ padding: "100px" }}>
      <Cons onClick={handleClickFromCha} />
    </div>
  );
}

export default Cha;
