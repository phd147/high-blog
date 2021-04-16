import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ImageSelect.css";
import CheckIcon from "@material-ui/icons/Check";

ImageSelect.propTypes = {
  images: PropTypes.array,
  onChange: PropTypes.func,
};

ImageSelect.defaultProps = {
  images: [],
  onChange: null,
};

function ImageSelect(props) {
  const { images, onChange } = props;
  const handleImageSelectChange = (event) => {
    if (onChange) onChange(event.target.value);
  };
  return (
    <div className="img-select__list">
      {images.map((e) => (
        <div>
          <input
            type="radio"
            name="img-select"
            id={e.path.slice(-12).slice(0, 8)}
            value={`http://35.240.173.198/${e.path}`}
            onChange={handleImageSelectChange}
          ></input>
          <label
            htmlFor={e.path.slice(-12).slice(0, 8)}
            className="img-select__label"
          >
            <CheckIcon fontSize="large" className="img-select__check-icon" />
            <img
              className="img-select__image"
              src={`http://35.240.173.198/${e.path}`}
              alt={e.name}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default ImageSelect;
