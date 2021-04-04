import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEDITOR from "ckeditor-blog";
import PropTypes from "prop-types";
import "./Editor.css";

ContentEditor.propTypes = {
  contentData: PropTypes.string,
  onContentChange: PropTypes.func,
};
ContentEditor.defaultProps = {
  data: '',
  onContentChange: null,
}
function ContentEditor(props) {
  const {data, onContentChange} = props;
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
          if(onContentChange) {
            console.log(data);
            onContentChange(data);
          }
          // console.log({ event, editor, data });
        }}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
    </div>
  );
}

export default ContentEditor;
