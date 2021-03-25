import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TitleEditor from "../../components/Editor/TitleEditor";
import ContentEditor from "../../components/Editor/ContentEditor";
import CKEDITOR from "ckeditor-blog";
import { Button } from "@material-ui/core";
import TagList from "../../components/TagList/index";
import './CreatePost.css';
import axios from "axios";

CreatePost.propTypes = {};
CKEDITOR.ContentEditor.defaultConfig.simpleUpload = {
  uploadUrl: "http://35.240.173.198/api/v1/files/ck/images",
  withCredentials: true,
  headers: {
    "X-CSRF-TOKEN": "CSRF-Token",
    Authorization: `Bearer <accessTokenHere>`,
  },
};
function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [listTag, setListTag] = useState([]);
  const handlePostClick = () => {
    console.log("Post submitted");
    const header = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY2ODIxMzkzNjQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY2ODIxMzksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY2OTA3Nzl9.Taj3fhbMbMvmKHhz7LA2TZ7xbiK-sf4CpG8ph0ktUwagL9G-Ms31TsOcNwPc6-hyJehblW6C7uth70sejKN3BA",
    };
    axios
      .post(
        "http://35.240.173.198/api/v1/user/posts",
        {
          category_id: 0,
          content: content,
          cover_image_path: "path",
          post_type: "DRAFT",
          summary: "CKEditor",
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
  const handleContentChange = (data) => {
    setContent(data);
  };
  const handleSelectTag = (value) => {
    console.log("TAGS: ", value);
    setTags(value);
  };
  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTY2ODIxMzkzNjQiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTY2ODIxMzksInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTY2OTA3Nzl9.Taj3fhbMbMvmKHhz7LA2TZ7xbiK-sf4CpG8ph0ktUwagL9G-Ms31TsOcNwPc6-hyJehblW6C7uth70sejKN3BA",
    };
    try {
      axios
        .get("http://35.240.173.198/api/v1/tags", { headers: header })
        .then(function (response) {
          setListTag(response.data);
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="create-post-container">
      <h2>Create your new post</h2>
      <TagList listTag={listTag} onSelectTag={handleSelectTag} />
      <TitleEditor onTitleChange={handleTitleChange} />
      <ContentEditor onContentChange={handleContentChange} />
      <Button variant="contained" color="primary" onClick={handlePostClick}>
        Post
      </Button>
    </div>
  );
}

export default CreatePost;
