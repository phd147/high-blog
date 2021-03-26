import React from 'react';
import PropTypes from 'prop-types';
import './TagsView.css';

TagsView.propTypes = {
  tagList: PropTypes.array,
};
TagsView.defaultProps = {
  tagList: [],
}

function TagsView(props) {
  const {tagList} = props;
  return (
    <div className="tags-view">
      <ul>
        {tagList.map((tag) => (
          <li key={tag.id} className="tags-view__item">
            {`#${tag.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagsView;
// 