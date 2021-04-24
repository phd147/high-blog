import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import FileManagementService from "../../containers/FileManagement/FileManagement.service";
import ImageSelect from "../ImageSelect";
import AddIcon from "@material-ui/icons/Add";
import "./ImageModal.css";

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

    const { data } = await FileManagementService.getImages();
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
    <>
      <IconButton
        variant="contained"
        style={{ backgroundColor: "#002884", color: "white" }}
        onClick={handleOpen}
      >
        <AddIcon fontSize="small" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
