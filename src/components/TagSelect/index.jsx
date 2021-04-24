/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Multiselect } from "multiselect-react-dropdown";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import styles from "./TagSelect.module.css";

TagSelect.propTypes = {
  listTag: PropTypes.array,
  value: PropTypes.array,
  onSelectTag: PropTypes.func,
};

TagSelect.defaultProps = {
  listTag: [],
  value: [],
  onSelectTag: null,
};

export default function TagSelect(props) {
  const { listTag, onSelectTag, value } = props;
  const handleTagSelectChange = (event, value) => {
    if (onSelectTag) {
      onSelectTag(value);
    }
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        size="small"
        multiple
        id="combo-box-demo"
        options={listTag}
        defaultValue={value}
        getOptionLabel={(option) => option.name}
        style={{ width: "100%" }}
        onChange={handleTagSelectChange}
        renderInput={(params) => (
          <TextField {...params} label="Add tags..." variant="outlined" />
        )}
      />
    </div>
  );
}
