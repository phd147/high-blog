import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { list } from "./ImageHelper";
import "./ImageModal.css";
import { Button } from "@material-ui/core";
import ImageSelect from "../ImageSelect";

export default function ImageModal() {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);
  const [imageList, setImageList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setImageList(list);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="img-modal">
      <div className="img-modal__header">
        <h2 id="simple-modal-title">My Images</h2>
        <Button>+ New</Button>
      </div>
      <ImageSelect images = {imageList}/>
      {/* <div className="img-modal__list">
        {imageList.map((e) => (
          <img className="img-modal__image" src={e} alt={e} />
        ))}
      </div> */}
      <div className="img-modal__footer">
        <Button>Add</Button>
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
