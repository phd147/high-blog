import React from "react";
import PropTypes from "prop-types";
import "./TagsView.css";
import { Link } from "react-router-dom";

TagsView.propTypes = {
  tagList: PropTypes.array,
};
TagsView.defaultProps = {
  tagList: [],
};

function TagsView(props) {
  const { tagList } = props;
  return (
    <div className="tags-view">
      <ul>
        {tagList.map((tag) => (
          <li key={tag.id}>
            <Link className="tags-view__link" to="#">{`#${tag.name}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagsView;
//
