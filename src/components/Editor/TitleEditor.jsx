import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEDITOR from "ckeditor-blog";
import PropTypes from "prop-types";
import "./Editor.css";

TitleEditor.propTypes = {
  titleData: PropTypes.string,
  onTitleChange: PropTypes.func,
};
TitleEditor.defaultProps = {
  titleData: "",
  onTitleChange: null,
};

function TitleEditor(props) {
  const { titleData, onTitleChange } = props;
  return (
    <div className="editor-container editor-title">
      <label htmlFor="">Title</label>
      <CKEditor
        editor={CKEDITOR.TitleEditor}
        data={titleData}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onTitleChange(data);
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

export default TitleEditor;
