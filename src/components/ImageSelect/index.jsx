import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ImageSelect.css";
import CheckIcon from "@material-ui/icons/Check";
import { BASE_URL } from "../../constant";

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
        <div className="img-select__item">
          <input
            type="radio"
            name="img-select"
            id={e.id}
            value={`${BASE_URL}/${e.path}`}
            onChange={handleImageSelectChange}
          ></input>
          <label htmlFor={e.id} className="img-select__label">
            <CheckIcon fontSize="large" className="img-select__check-icon" />
            <img
              className="img-select__image"
              src={`${BASE_URL}/${e.path}`}
              alt={e.name}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default ImageSelect;
