import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./PostPreview.css";

PostPreview.propTypes = {
  postTitle: PropTypes.string,
  postContent: PropTypes.string,
};

PostPreview.defaultProps = {
  postTitle: "",
  postContent: "",
};
function addCodeLabel() {
  var langClasses = document.getElementsByTagName("code");
  for (let i = 0; i < langClasses.length; i++) {
    var lang = langClasses[i].className.toString().split("-")[1].toUpperCase();
    document.getElementsByTagName("pre")[i].setAttribute("data-language", lang);
  }
}

function PostPreview(props) {
  const { postTitle, postContent } = props;
  useEffect(() => {
    addCodeLabel();
  }, []);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `<h2>${postTitle}</h2>` }} />
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}

export default PostPreview;
