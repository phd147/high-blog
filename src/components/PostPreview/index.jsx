import React from 'react';
import PropTypes from 'prop-types';

PostPreview.propTypes = {
  postTitle: PropTypes.string,
  postContent: PropTypes.string,
};

PostPreview.defaultProps = {
  postTitle: "",
  postContent: "",
}

function PostPreview(props) {
  const {postTitle, postContent} = props;
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: postTitle }} />
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}

export default PostPreview;