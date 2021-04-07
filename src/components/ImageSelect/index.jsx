import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ImageSelect.css";
import CheckIcon from "@material-ui/icons/Check";
ImageSelect.propTypes = {
  images: PropTypes.array,
};

function ImageSelect(props) {
  const { images } = props;
  const [selected, setSelected] = useState("");
  const handleImageSelectChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div className="img-select__list">
      {images.map((e) => (
        <div>
          <input
            type="radio"
            name="img-select"
            id={e.slice(25, 29)}
            value={e}
            onChange={handleImageSelectChange}
          ></input>
          <label htmlFor={e.slice(25, 29)} className="img-select__label">
            <CheckIcon fontSize="large" className="img-select__check-icon" />
            <img className="img-select__image" src={e} alt={e} />
          </label>
        </div>
      ))}
      <h2>Selected : {selected}</h2>
    </div>
  );
}

export default ImageSelect;
