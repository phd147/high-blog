import React from "react";
import PropTypes from "prop-types";
import "./TagsView.css";
import { Link, useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";

TagsView.propTypes = {
  tagList: PropTypes.array,
};
TagsView.defaultProps = {
  tagList: [],
};

function TagsView(props) {
  const { tagList } = props;
  const history = useHistory();
  return (
    <div className="tags-view">
      <ul>
        {tagList.map((tag) => (
          <Chip
            onClick={() => history.push(`/t/${tag.id}/${tag.name}`)}
            style={{ marginRight: "5px", cursor: "pointer" }}
            key={tag.id}
            label={tag.name}
          />
        ))}
      </ul>
    </div>
  );
}

export default TagsView;
//
