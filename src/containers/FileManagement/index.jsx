import { Button, Grid, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import { BASE_URL } from "../../constant";
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
    try {
      const data = new FormData();
      data.append("image", event.target.files[0]);
      await FileManagementService.postImage(data);
      setTrigger(Math.random());
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await FileManagementService.deleteImage(id);
      console.log("DELETE: ", response);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleImageDelete = async () => {
    const promises = [];
    selectedList.forEach((imageId) => {
      promises.push(handleDelete(imageId));
    });
    await Promise.all(promises);
    setSelectedList([]);
    unCheck();
    fetchImages();
  };

  async function fetchImages() {
    try {
      const response = await FileManagementService.getImages();
      console.log("FETCH: ", response);
      setImages(response.data.items);
    } catch (error) {
      console.log("Failed to get images");
    }
  }

  useEffect(() => {
    fetchImages();
  }, [trigger]);

  return (
    <Grid container spacing={1}>
      {images.length === 0 ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <h2>No photos for displaying</h2>
        </div>
      ) : (
        <Grid item xs={12} sm={10} md={9}>
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
                value={item.id}
                onChange={handleImageSelect}
              ></input>
              <label htmlFor={index}>
                <CheckCircleRoundedIcon className="file__check-icon" />
              </label>
              <img
                src={`${BASE_URL}/${item.path}`}
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
              src={images.map((item) => `${BASE_URL}/${item.path}`)}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            />
          )}
        </Grid>
      )}
      <Grid item xs={1} sm={1} md={3}>
        <div
          className={
            selectedList.length > 0
              ? "file__action visible"
              : "file__action hidden"
          }
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleImageDelete}
          >
            Xóa đã chọn ({selectedList.length})
          </Button>
          <IconButton
            aria-label="close"
            onClick={() => {
              setSelectedList([]);
              unCheck();
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
