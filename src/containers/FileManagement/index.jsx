import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, IconButton } from "@material-ui/core";
import ImgsViewer from "react-images";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import "./FileManagement.css";
import FileManagementService from "./FileManagement.service";

FileManagement.propTypes = {};

function FileManagement(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [images, setImages] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const addImageRef = useRef(null);

  function unCheck() {
    var x = document.getElementsByClassName("img-checkbox");
    for (var i = 0; i < x.length; i++) {
      x[i].checked = false;
    }
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleImageSelect = (event) => {
    let newSelectedList = [...selectedList];
    if (event.target.checked) {
      newSelectedList.push(event.target.value);
    } else {
      const index = newSelectedList.indexOf(event.target.value);
      if (index !== -1) newSelectedList.splice(index, 1);
    }
    setSelectedList(newSelectedList);
  };
  const handleImageUpload = async (event) => {
    const fileManagementService = new FileManagementService();
    try {
      const data = new FormData();
      data.append("image", event.target.files[0]);
      await fileManagementService.postImage(data);
      setTrigger(Math.random());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchImages() {
      const fileManagementService = new FileManagementService();
      try {
        const response = await fileManagementService.getImages();
        console.log(response);
        setImages(response.data.items);
      } catch (error) {
        console.log("Failed to get images");
      }
    }
    fetchImages();
  }, [trigger]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={1} sm={1} md={9}>
        {images.map((item, index) => (
          <div
            key={index}
            className="file__image-item"
            style={{
              display: "inline-block",
              marginLeft: "20px",
              marginTop: "30px",
            }}
          >
            <input
              className="img-checkbox"
              type="checkbox"
              id={index}
              value={item.path}
              onChange={handleImageSelect}
            ></input>
            <label htmlFor={index}>
              <CheckCircleRoundedIcon className="file__check-icon" />
            </label>
            <img
              src={`http://35.240.173.198/${item.path}`}
              onClick={() => openImageViewer(index)}
              width="100%"
              height="100%"
              key={index}
              style={{ margin: "2px" }}
              alt=""
            />
          </div>
        ))}
        {isViewerOpen && (
          <ReactSimpleImageViewer
            src={images.map((item) => `http://35.240.173.198/${item.path}`)}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
            }}
          />
        )}
      </Grid>
      <Grid item xs={1} sm={1} md={3}>
        <div
          className={
            selectedList.length > 0
              ? "file__action visible"
              : "file__action hidden"
          }
        >
          <Button variant="contained" color="primary">
            Xóa đã chọn ({selectedList.length})
          </Button>
          <IconButton
            aria-label="close"
            onClick={() => {
              setSelectedList([]);
              unCheck();
              // var x = document.getElementsByClassName("img-checkbox");
              // for (let i = 0; i <= x.length; i++) {
              //   x[i].checked = false;
              // }
            }}
          >
            <CloseIcon />
          </IconButton>
          <input
            ref={addImageRef}
            type="file"
            style={{ display: "none" }}
            accept=".png, .jpg, .jpeg"
            onChange={handleImageUpload}
          />
        </div>
        <div className="file__add-btn">
          <IconButton
            variant="contained"
            style={{ backgroundColor: "#002884", color: "white" }}
            onClick={() => addImageRef.current.click()}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default FileManagement;
