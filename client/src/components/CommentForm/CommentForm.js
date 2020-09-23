import React, { useState } from 'react';
import axios from 'axios';

import './CommentForm.scss';

const CommentForm = (props) => {
  const {
    comment,
    user_id,
    post_id,
    reply,
    edit,
    toggleReply,
    toggleEdit,
    fetchComments,
  } = props;

  const [text, setText] = useState(edit ? comment.text : '');

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (text.trim() !== '') {
      e.preventDefault();
      if (reply) {
        const addComment = {
          text,
          points: 1,
          user_id,
          post_id: comment.post_id,
          parent_id: comment._id,
        };
        axios
          .post('comments/add', addComment)
          .then((res) => console.log(res.data))
          .then(fetchComments)
          .then(toggleReply)
          .then(setText(''));
      } else {
        const addComment = {
          text,
          points: 1,
          user_id,
          post_id,
        };
        axios
          .post('comments/add', addComment)
          .then((res) => console.log(res.data))
          .then(fetchComments)
          .then(toggleReply)
          .then(setText(''));
      }
    }
  };

  const handleEdit = (e) => {
    if (text.trim() !== '') {
      e.preventDefault();
      const editComment = {
        ...comment,
        text,
      };

      axios
        .post('comments/update/' + comment._id, editComment)
        .then((res) => console.log(res.data))
        .then(fetchComments)
        .then(toggleEdit);
    }
  };

  // resize textarea found on stackoverflow by DreamTeK
  const tx = document.getElementsByTagName('textarea');
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      'style',
      'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
    );
    tx[i].addEventListener('input', OnInput, false);
  }
  function OnInput() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  }

  return (
    <div className='component-form-container'>
      {!reply && !edit && (
        <span className='comment-as'>
          Comment as <span className='user'>{user_id}</span>
        </span>
      )}
      <div className='textarea-container'>
        <textarea
          value={text}
          placeholder='What are your thoughts?'
          onChange={handleChangeText}
        />
        <footer>
          {(reply || edit) && (
            <div
              className='btn cancel-btn'
              onClick={reply ? toggleReply : toggleEdit}
            >
              Cancel
            </div>
          )}
          <div
            className={
              text.trim() === ''
                ? 'btn comment-btn-disabled'
                : 'btn comment-btn-enabled'
            }
            onClick={edit ? handleEdit : handleSubmit}
          >
            {reply ? 'REPLY' : edit ? 'SAVE' : 'COMMENT'}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CommentForm;
