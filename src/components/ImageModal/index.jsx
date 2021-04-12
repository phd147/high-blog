import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { list } from "./ImageHelper";
import "./ImageModal.css";
import { Button } from "@material-ui/core";
import ImageSelect from "../ImageSelect";
import { propTypes } from "react-bootstrap/esm/Image";
import ApiHelper from "../../configs/api/api-helper";

ImageModal.propTypes = {
  onAddClick: propTypes.func,
};

ImageModal.defaultProps = {
  onAddClick: null,
};

export default function ImageModal(props) {
  const { onAddClick } = props;

  const [open, setOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [selected, setSelected] = useState("");

  const handleOpen = async () => {
    setOpen(true);
    const apiHelper = new ApiHelper();
    const { data } = await apiHelper.get(
      "http://35.240.173.198/api/v1/user/files/images"
    );
    setImageList(data.items);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClick = () => {
    if (onAddClick) onAddClick(selected);
    setOpen(false);
  };

  const handleChangeImage = (imageUrl) => {
    setSelected(imageUrl);
  };

  const body = (
    <div className="img-modal">
      <div className="img-modal__header">
        <h2 id="simple-modal-title">My Images</h2>
        <Button>+ New</Button>
      </div>
      <ImageSelect onChange={handleChangeImage} images={imageList} />
      {/* <div className="img-modal__list">
        {imageList.map((e) => (
          <img className="img-modal__image" src={e} alt={e} />
        ))}
      </div> */}
      <div className="img-modal__footer">
        <Button onClick={handleAddClick}>Add</Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        My Image Library
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
