import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import TitleEditor from "../../components/Editor/TitleEditor";
import ContentEditor from "../../components/Editor/ContentEditor";
import CKEDITOR from "ckeditor-blog";
import TagList from "../../components/TagList/index";
import "./CreatePost.css";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Image,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Card } from "@material-ui/core";
import PostPreview from "../../components/PostPreview";

CreatePost.propTypes = {};
CKEDITOR.ContentEditor.defaultConfig.simpleUpload = {
  uploadUrl: "http://35.240.173.198/api/v1/files/ck/images",
  withCredentials: true,
  headers: {
    "X-CSRF-TOKEN": "CSRF-Token",
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY3NzM2OTkxODQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY3NzM2OTksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY3ODIzMzl9.YzfuEHPWi9b7S-B1kf-4bAyqu9cDJt0kPpE2CPuxXFjn-To7G6KpJh-rrOiCQSxMvxWrPQeMDyitOCwgfnmjGw`,
  },
};
function CreatePost(props) {
  console.log("RE_RENDER");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [category, setCategory] = useState(1);
  const [coverImagePath, setCoverImagePath] = useState("");

  const [isPreview, setIsPreview] = useState(false);

  const coverImageRef = useRef(null);
  const handlePostClick = (postType) => {
    console.log("Post submitted");
    const header = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY3NzM2OTkxODQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY3NzM2OTksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY3ODIzMzl9.YzfuEHPWi9b7S-B1kf-4bAyqu9cDJt0kPpE2CPuxXFjn-To7G6KpJh-rrOiCQSxMvxWrPQeMDyitOCwgfnmjGw",
    };
    axios
      .post(
        "http://35.240.173.198/api/v1/user/posts",
        {
          category_id: 0,
          content: content,
          cover_image_path: coverImagePath,
          post_type: postType,
          summary: summary,
          tags: tags,
          title: title,
        },
        { headers: header }
      )
      .then(function (response) {
        console.log(response);
      });
  };
  const handleTitleChange = (data) => {
    setTitle(data);
  };
  // const handleTitleChange = useMemo(() => {

  // }, [])
  const handleContentChange = (data) => {
    setContent(data);
  };
  const handleSelectTag = (selectedList) => {
    console.log("TAGS: ", selectedList);
    setTags(selectedList);
  };
  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY3NzM2OTkxODQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY3NzM2OTksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY3ODIzMzl9.YzfuEHPWi9b7S-B1kf-4bAyqu9cDJt0kPpE2CPuxXFjn-To7G6KpJh-rrOiCQSxMvxWrPQeMDyitOCwgfnmjGw",
    };
    try {
      axios
        .get("http://35.240.173.198/api/v1/tags", { headers: header })
        .then(function (response) {
          setListTag(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY3NzM2OTkxODQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY3NzM2OTksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY3ODIzMzl9.YzfuEHPWi9b7S-B1kf-4bAyqu9cDJt0kPpE2CPuxXFjn-To7G6KpJh-rrOiCQSxMvxWrPQeMDyitOCwgfnmjGw",
    };
    try {
      axios
        .get("http://35.240.173.198/api/v1/tags", { headers: header })
        .then(function (response) {
          setListTag(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleFileUpload = (event) => {
    const data = new FormData();
    data.append("image", event.target.files[0]);
    console.log(event.target.files[0]);
    const header = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY3NzM2OTkxODQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY3NzM2OTksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY3ODIzMzl9.YzfuEHPWi9b7S-B1kf-4bAyqu9cDJt0kPpE2CPuxXFjn-To7G6KpJh-rrOiCQSxMvxWrPQeMDyitOCwgfnmjGw",
    };
    let url = "http://35.240.173.198/api/v1/user/files/images";

    axios
      .post(url, data, {
        headers: header,
      })
      .then((res) => {
        console.log(res);
        setCoverImagePath(res.data.path);
      });
  };
  const handleRemoveCoverImage = () => {
    setCoverImagePath("");
  };
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
            <PostPreview postTitle={title} postContent={content} />
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
                      onClick={handleRemoveCoverImage}
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
                <Col xs={12} sm={6} className="category-container">
                  <ToggleButtonGroup
                    type="radio"
                    name="options"
                    defaultValue={1}
                    onChange={(selected) => setCategory(selected)}
                  >
                    <ToggleButton size="sm" variant="outline-info" value={1}>
                      Posts
                    </ToggleButton>
                    <ToggleButton size="sm" variant="outline-info" value={2}>
                      Question
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
                <Col xs={12} sm={6}>
                  {" "}
                  <TagList listTag={listTag} onSelectTag={handleSelectTag} />
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
                  <Form.Group controlId="post-title">
                    <TitleEditor
                      data={title}
                      onTitleChange={handleTitleChange}
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
            <Button variant="success" onClick={handlePostClick}>
              Publish
            </Button>
            <Button variant="secondary" onClick={handlePostClick}>
              Save
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
