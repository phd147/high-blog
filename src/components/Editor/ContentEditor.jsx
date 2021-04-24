import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEDITOR from "ckeditor-blog";
import PropTypes from "prop-types";
import "./Editor.css";

ContentEditor.propTypes = {
  contentData: PropTypes.string,
  onContentChange: PropTypes.func,
  onContentFocus: PropTypes.func,
  onContentBlur: PropTypes.func,
};
ContentEditor.defaultProps = {
  data: "",
  onContentChange: null,
  onContentFocus: null,
  onContentBlur: null,
};
function ContentEditor(props) {
  const { data, onContentChange, onContentFocus, onContentBlur } = props;
  return (
    <div className="editor-container editor-content">
      <CKEditor
        editor={CKEDITOR.ContentEditor}
        data={data}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (onContentChange) {
            console.log(data);
            onContentChange(data);
          }
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          if (onContentBlur) onContentBlur();
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          if (onContentFocus) onContentFocus();
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}

export default ContentEditor;
