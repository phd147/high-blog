/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Multiselect } from "multiselect-react-dropdown";
import "./TagSelect.css";

TagSelect.propTypes = {
  listTag: PropTypes.array,
  value: PropTypes.array,
  onSelectTag: PropTypes.func,
};

TagSelect.defaultProps = {
  listTag: [],
  value: [],
  OnSelectTag: null,
};

export default function TagSelect(props) {
  const { listTag, onSelectTag, value } = props;
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
        selectedValues={value}
        onSelect={handleTagSelectChange}
        onRemove={() => {}}
        displayValue="name"
        placeholder="Add tags..."
        hidePlaceholder="true"
      />
    </div>
  );
}
