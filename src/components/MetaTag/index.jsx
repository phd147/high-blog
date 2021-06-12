import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

MetaTag.propTypes = {
  title: PropTypes.string,
};

function MetaTag(props) {
  console.log("META: ", props.children);
  return (
    <Helmet>
      <title>{props.children} - HighBlog</title>
    </Helmet>
  );
}

export default MetaTag;
