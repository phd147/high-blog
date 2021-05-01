import { Card } from "@material-ui/core";
import axios from "axios";
import CKEDITOR from "ckeditor-blog";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import ContentEditor from "../../components/Editor/ContentEditor";
import PostPreview from "../../components/PostPreview";
import TagSelect from "../../components/TagSelect/index";
import ImageModal from "../../components/ImageModal";
import "./CreatePost.css";
import { header, headerCK } from "./headerHelper.js";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/action/postActions";
import PostCreateService from "./CreatePost.service";
import { toast } from "react-toastify";

CreatePost.propTypes = {};
CKEDITOR.ContentEditor.defaultConfig.simpleUpload = {
  uploadUrl: "http://35.240.173.198/api/v1/user/files/ck/images",
  withCredentials: true,
  headers: headerCK,
};
function CreatePost(props) {
  console.log("RE_RENDER");
  const dispatch = useDispatch();
  const postCreated = useSelector((state) => state.postCreate);
  const { payload, isLoading, error } = postCreated;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [category, setCategory] = useState(1);
  const [listCategory, setListCategory] = useState([]);
  const [coverImagePath, setCoverImagePath] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const coverImageRef = useRef(null);

  useEffect(() => {
    async function fetchTags() {
      const postCreateService = new PostCreateService();
      try {
        const response = await postCreateService.getTags();
        setListTag(response.data);
      } catch (error) {
        console.log(error);
        toast(error);
      }
    }
    fetchTags();
    console.log("FETCH TAGS");
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const postCreateService = new PostCreateService();
      try {
        const response = await postCreateService.getCategories();
        setListCategory(response.data);
      } catch (error) {
        toast(error.response.message);
      }
    }
    fetchCategories();
    console.log("FETCH CATEGORIES");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("highblog/new")) {
      const draft = JSON.parse(localStorage.getItem("highblog/new"));
      setTitle(draft.title);
      setSummary(draft.summary);
      setContent(draft.content);
      setTags(draft.tags);
      setCategory(draft.category);
      setCoverImagePath(draft.coverImagePath);
    }
  }, []);

  useEffect(() => {
    let draft = {
      title: title,
      summary: summary,
      content: content,
      tags: tags,
      category: category,
      coverImagePath: coverImagePath,
    };
    localStorage.setItem("highblog/new", JSON.stringify(draft));
  }, [title, summary, content, tags, category, coverImagePath]);

  const handleContentChange = (data) => {
    setContent(data);
  };

  const handleSelectTag = (selectedList) => {
    setTags(selectedList);
  };

  const handleFileUpload = async (event) => {
    const postCreateService = new PostCreateService();
    try {
      const data = new FormData();
      data.append("image", event.target.files[0]);
      const response = await postCreateService.postImage(data);
      setCoverImagePath(response.data.path);
    } catch (error) {
      toast(error.response.message);
    }
    console.log("UPLOAD COVER IMAGE");
  };

  const handlePostClick = (postType) => {
    const postObj = {
      categoryId: category,
      content: content,
      coverImagePath: coverImagePath,
      postType: postType,
      summary: summary,
      tags: tags,
      title: title,
    };
    dispatch(createPost(postObj));
  };

  const handleAddImageFromLibrary = (imageUrl) => {
    console.log("handle Add iamge", imageUrl);
    const newImage = `<figure class="image image_resized"><img
    src="${imageUrl}"></figure>`;
    const newContent = content.concat(newImage);
    console.log("NEW CONTENT: ", newContent);
    setContent(newContent);
  };

  useEffect(() => {
    const titleUrl = title.toLowerCase().replace(" ", "-");
    if (typeof payload == "number")
      props.history.push(
        decodeURIComponent(`/${payload}/${titleUrl}`.replace(/\+/g, " "))
      );
  }, [payload, props.history]);

  return (
    <Container className="create-post-container">
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12} sm={6}>
          <h2>#New Post</h2>
        </Col>
        <Col xs={12} sm={6} className="view-type">
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={false}
            onChange={(selected) => setIsPreview(selected)}
          >
            <ToggleButton size="sm" variant="outline-secondary" value={false}>
              Edit
            </ToggleButton>
            <ToggleButton size="sm" variant="outline-secondary" value={true}>
              Preview
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      {/* {isPreview ? (
          <PostPreview postTitle={title} postContent={content} />
        ) : ( */}
      <Card className="create-post-card">
        <div className="scroll">
          {isPreview ? (
            <PostPreview
              postTitle={title !== "" ? title : "No title"}
              postContent={
                content !== "" ? content : "No content for displaying"
              }
              postTags={tags}
            />
          ) : (
            <div>
              <Row>
                <Col xs={12} sm={5}>
                  <input
                    ref={coverImageRef}
                    onChange={handleFileUpload}
                    type="file"
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    // multiple={false}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => coverImageRef.current.click()}
                  >
                    {coverImagePath === "" ? "Add a cover image" : "Change"}
                  </Button>
                  {coverImagePath !== "" && (
                    <Button
                      variant="outline-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => setCoverImagePath("")}
                    >
                      Remove
                    </Button>
                  )}
                </Col>
                <Col xs={12} sm={4}>
                  {coverImagePath !== "" && (
                    <Image
                      className="cover-image"
                      src={`http://35.240.173.198/${coverImagePath}`}
                      thumbnail
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <ImageModal onAddClick={handleAddImageFromLibrary} />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6} className="category-container">
                  <ToggleButtonGroup
                    type="radio"
                    name="options"
                    defaultValue={1}
                    onChange={(selected) => setCategory(selected)}
                  >
                    {listCategory.map((item) => (
                      <ToggleButton
                        key={item.id}
                        size="sm"
                        variant="outline-info"
                        value={item.id}
                      >
                        {item.title}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Col>
                <Col xs={12} sm={6}>
                  {" "}
                  <TagSelect
                    listTag={listTag}
                    onSelectTag={handleSelectTag}
                    value={tags}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="post-summary">
                    <Form.Control
                      as="textarea"
                      placeholder="Type the summary"
                      rows={1}
                      onChange={(e) => setSummary(e.target.value)}
                      value={summary}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <Form.Group controlId="post-title">
                    <TitleEditor
                      data={title}
                      onTitleChange={handleTitleChange}
                    />
                  </Form.Group>
                   */}
                  <Form.Group controlId="post-title">
                    <Form.Control
                      className="title-editor"
                      as="textarea"
                      placeholder="Type the title"
                      rows={2}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="post-content">
                    <ContentEditor
                      data={content}
                      onContentChange={handleContentChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Card>

      <Row>
        <Col>
          <Form.Group className="post-btn">
            <Button variant="success" onClick={() => handlePostClick("NORMAL")}>
              Publish
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePostClick("DRAFT")}
            >
              Save
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
