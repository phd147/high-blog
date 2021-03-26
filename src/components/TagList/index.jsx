/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Multiselect } from "multiselect-react-dropdown";
import "./TagList.css";

TagList.propTypes = {
  listTag: PropTypes.array,
  onSelectTag: PropTypes.func,
};

TagList.defaultProps = {
  listTag: [],
  OnSelectTag: null,
};

export default function TagList(props) {
  const { listTag, onSelectTag } = props;
  const [selected, setSelected] = useState([]);
  const handleTagSelectChange = (selectedList) => {
    if (onSelectTag) {
      onSelectTag(selectedList);
    }
  };

  return (
    <div className="tags">
      <Multiselect
        className="tag-inner"
        options={listTag}
        selectedValues={[]}
        onSelect={handleTagSelectChange}
        onRemove={() => {}}
        displayValue="name"
        placeholder="Add tags..."
        hidePlaceholder="true"
      />
    </div>
  );
}
