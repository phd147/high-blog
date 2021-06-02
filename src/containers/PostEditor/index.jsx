import { Button, Card, Container, Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import CKEDITOR from "ckeditor-blog";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ContentEditor from "../../components/Editor/ContentEditor";
import ImageModal from "../../components/ImageModal";
import PostPreview from "../../components/PostPreview";
import TagSelect from "../../components/TagSelect/index";
import { BASE_URL } from "../../constant";
import { CKConfig } from "./CK-Helper.js";
import styles from "./PostEditor.module.css";
import PostEditorService from "./PostEditor.service";
import PropTypes from "prop-types";
const toggleTheme = createMuiTheme({
  overrides: {
    MuiToggleButton: {
      root: {
        height: "30px",
        width: "100px",
      },
    },
  },
});

let theme = createMuiTheme({});
theme = {
  ...theme,
  overrides: {
    MuiToggleButton: {
      root: {
        borderRadius: "2px !important",
        width: "100%",
      },
    },
    Mui: {
      selected: {
        backgroundColor: "#ccc",
      },
    },
    MuiToggleButtonGroup: {
      root: {
        width: "90%",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          margin: "0 auto",
        },
      },
    },
  },
};

PostEditor.propTypes = {
  isEdit: PropTypes.bool,
};
PostEditor.defaultProps = {
  isEdit: false,
};
CKEDITOR.ContentEditor.defaultConfig.simpleUpload = CKConfig;
function PostEditor(props) {
  const { isEdit } = props;
  const { id: postId } = useParams();
  const history = useHistory();

  const [contentFocus, setContentFocus] = useState(false);

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

  const [isLoading, setIsLoading] = useState(true);

  const userInfo = useSelector((state) => state.user);

  async function fetchTags() {
    try {
      const response = await PostEditorService.getTags();
      setListTag(response.data);
    } catch (error) {
      console.log(error);
      toast(error);
    }
  }
  async function fetchCategories() {
    try {
      const response = await PostEditorService.getCategories();
      setListCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTags();
    fetchCategories();
    if (isEdit) {
      async function fetchPostDetails() {
        try {
          const { data } = await PostEditorService.getPostToEdit(postId);
          setTitle(data.title);
          setSummary(data.summary);
          setContent(data.content);
          setTags(data.tags);
          setCategory(data.categoryId);
          setCoverImagePath(data.coverImagePath);
        } catch (error) {
          console.log("FETCH POST ERROR: ", error);
          history.push("/404");
        }
        setIsLoading(false);
      }
      fetchPostDetails();
      //
    } else {
      if (localStorage.getItem("highblog/new")) {
        const draft = JSON.parse(localStorage.getItem("highblog/new"));
        setTitle(draft.title);
        setSummary(draft.summary);
        setContent(draft.content);
        setTags(draft.tags);
        setCategory(draft.category);
        setCoverImagePath(draft.coverImagePath);
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isEdit) {
      let draft = {
        title: title,
        summary: summary,
        content: content,
        tags: tags,
        category: category,
        coverImagePath: coverImagePath,
      };
      localStorage.setItem("highblog/new", JSON.stringify(draft));
    }
  }, [title, summary, content, tags, category, coverImagePath]);

  const handleContentChange = (data) => {
    setContent(data);
  };

  const handleSelectTag = (selectedList) => {
    setTags(selectedList);
  };

  const handleFileUpload = async (event) => {
    try {
      const data = new FormData();
      data.append("image", event.target.files[0]);
      const response = await PostEditorService.postImage(data);
      setCoverImagePath(response.data.path);
    } catch (error) {
      toast(error.response.message);
    }
  };

  // VALIDATION
  const isUnvalidPost = () => {
    console.log("Title: ", title);
    console.log("Content: ", content);
    if (title.trim() === "" || content.trim() === "") return true;
    return false;
  };

  const handlePostClick = async (postType) => {
    const postObj = {
      categoryId: category,
      content: content,
      coverImagePath: coverImagePath,
      postType: postType,
      summary: summary,
      tags: tags,
      title: title.trim(),
    };
    if (isUnvalidPost()) {
      toast.error("Title and content cannot be empty");
      return;
    }
    const titleUrl = title.trim().toLowerCase().replaceAll(" ", "-");
    const location = {
      pathname: `p/${postId}/${titleUrl}`,
    };
    if (isEdit) {
      await PostEditorService.updatePost(postId, postObj);
      window.location.replace(`/p/${postId}/${titleUrl}`);
    } else {
      const { data } = await PostEditorService.postPost(postObj);
      history.replace(`p/${data}/${titleUrl}`);
    }
    localStorage.removeItem("highblog/new");
  };

  const handleDiscardClick = () => {
    // window.location.replace(`/p/${postId}/${titleUrl}`);
    history.goBack();
    localStorage.removeItem("highblog/new");
  };

  const handleAddImageFromLibrary = (imageUrl) => {
    const newImage = `<figure class="image image_resized"><img
    src="${imageUrl}"></figure>`;
    const newContent = content.concat(newImage);
    setContent(newContent);
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Container className={styles.container}>
          <Grid container spacing={2}>
            <Grid
              item
              md={9}
              sm={10}
              style={{ position: "relative", width: "100%" }}
            >
              <h2 style={{ color: "black" }}>
                {isEdit ? "Edit your post" : "New post"}
              </h2>

              <div className={styles.view_type}>
                <ThemeProvider theme={toggleTheme}>
                  <ToggleButtonGroup
                    value={isPreview}
                    exclusive
                    onChange={(event, value) => {
                      setIsPreview(value);
                    }}
                  >
                    <ToggleButton size="small" value={false} aria-label="edit">
                      Edit
                    </ToggleButton>
                    <ToggleButton value={true} aria-label="preview">
                      Preview
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ThemeProvider>
              </div>
              <Card className={styles.card}>
                <div className={styles.scroll}>
                  {isPreview ? (
                    <PostPreview
                      postOwner={userInfo}
                      postTitle={title !== "" ? title : "No title"}
                      postContent={
                        content !== "" ? content : "No content for displaying"
                      }
                      postTags={tags}
                    />
                  ) : (
                    <div>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <input
                            ref={coverImageRef}
                            onChange={handleFileUpload}
                            type="file"
                            style={{ display: "none" }}
                            accept=".png, .jpg, .jpeg"
                            // multiple={false}
                          />
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => coverImageRef.current.click()}
                          >
                            {coverImagePath === ""
                              ? "Add a cover image"
                              : "Change"}
                          </Button>
                          {coverImagePath !== "" && (
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ marginLeft: "10px" }}
                              onClick={() => setCoverImagePath("")}
                            >
                              Remove
                            </Button>
                          )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          {coverImagePath !== "" && (
                            <img
                              alt="cover"
                              className={styles.cover_image}
                              src={`${BASE_URL}/${coverImagePath}`}
                            ></img>
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction={"row"}
                        style={{ margin: "10px 0" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          className={styles.category_container}
                        >
                          <ToggleButtonGroup
                            exclusive
                            defaultValue={1}
                            value={category}
                            onChange={(event, value) => setCategory(value)}
                          >
                            {listCategory.map((item) => (
                              <ToggleButton
                                size="small"
                                key={item.id}
                                value={item.id}
                              >
                                {item.title}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {" "}
                          <TagSelect
                            listTag={listTag}
                            onSelectTag={handleSelectTag}
                            value={tags}
                          />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <TextareaAutosize
                          className={styles.summary}
                          rowsMin={1}
                          rowsMax={4}
                          aria-label="summary"
                          placeholder="Type the summary"
                          onChange={(e) => setSummary(e.target.value)}
                          value={summary}
                        />
                      </Grid>
                      <Grid item>
                        <TextareaAutosize
                          className={styles.title}
                          rowsMin={2}
                          rowsMax={4}
                          aria-label="title"
                          placeholder="Type the title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <ContentEditor
                          data={content}
                          onContentChange={handleContentChange}
                          onContentFocus={() => setContentFocus(true)}
                        />
                      </Grid>
                    </div>
                  )}
                </div>
              </Card>
              <Grid item>
                <div className={styles.post_btn}>
                  <Button
                    className={styles.btn}
                    variant="contained"
                    color="primary"
                    onClick={() => handlePostClick("NORMAL")}
                  >
                    {isEdit ? "Update" : "Publish"}
                  </Button>
                  {isEdit ? (
                    <Button
                      className={styles.btn}
                      variant="contained"
                      onClick={handleDiscardClick}
                    >
                      Discard
                    </Button>
                  ) : (
                    <Button
                      className={styles.btn}
                      variant="contained"
                      onClick={() => handlePostClick("DRAFT")}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </Grid>
              {contentFocus && !isPreview && (
                <div className={styles.library}>
                  <ImageModal onAddClick={handleAddImageFromLibrary} />
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default PostEditor;
