import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { format, differenceInHours } from 'date-fns';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FaCommentAlt } from 'react-icons/fa';
import { BsPlusCircleFill } from 'react-icons/bs';

import './Comments.scss';
import CommentForm from './CommentForm';

const Comments = (props) => {
  const {
    comment,
    hiddenComments,
    setHiddenComments,
    fetchComments,
    renderChildComment,
  } = props;
  const [showReplyBlock, setShowReplyBlock] = useState(false);
  const [showEditBlock, setShowEditBlock] = useState(false);
  const [showVerifyDeleteModal, setShowVerifyDeleteModal] = useState(false);

  const renderComments = () => {
    let { _id, text, points, user_id, createdAt } = props.comment;
    return (
      <div className='comment-container'>
        <div className='sidebar'>
          {hiddenComments.indexOf(_id) === -1 ? (
            <div className='vote-arrows'>
              <div className='up-arrow'>
                <GoArrowUp size={20} />
              </div>
              <div className='down-arrow'>
                <GoArrowDown size={20} />
              </div>
              <div
                className='vertical-line'
                onClick={() => handleHideComment(_id)}
              />
            </div>
          ) : (
            <BsPlusCircleFill
              className='plus-circle'
              onClick={() => handleHideComment(_id)}
            />
          )}
          <div className='comment-section'>
            <div className='header'>
              {user_id}{' '}
              <span className='info'>
                {points}
                {points === 1 || points === -1 ? ' point ' : ' points '}
                &#183;
                {createdTimeAgo(createdAt)}
                {/* {format(new Date(createdAt), 'MMMM d, yyyy - h:mm aa')} */}
              </span>
            </div>
            {hiddenComments.indexOf(_id) === -1 && (
              <>
                <div className='better-name'>
                  {!showEditBlock ? (
                    <>
                      <div className='comment'>{text}</div>
                      <div className='btn-group'>
                        <Button
                          className='comment-btn'
                          size='sm'
                          onClick={toggleReplyBlock}
                        >
                          <FaCommentAlt />
                          &nbsp;&nbsp;Reply
                        </Button>
                        <Button
                          className='comment-btn'
                          size='sm'
                          onClick={toggleEditBlock}
                        >
                          Edit
                        </Button>
                        <Button
                          className='comment-btn'
                          size='sm'
                          onClick={toggleVerifyDeleteModal}
                        >
                          Delete
                        </Button>
                      </div>

                      {showReplyBlock && (
                        <CommentForm
                          user_id='Brady'
                          comment={comment}
                          reply
                          fetchComments={fetchComments}
                          toggleReply={toggleReplyBlock}
                        />
                      )}
                    </>
                  ) : (
                    <CommentForm
                      comment={comment}
                      edit
                      fetchComments={fetchComments}
                      toggleEdit={toggleEditBlock}
                    />
                  )}
                </div>
                {renderChildComment(_id)}
              </>
            )}
          </div>
        </div>
        {renderVerifyDeleteModal()}
      </div>
    );
  };

  const createdTimeAgo = (createdAt) => {
    const createdHoursAgo = differenceInHours(new Date(), new Date(createdAt));
    if (createdHoursAgo >= 24) {
      const createdDaysAgo = Math.floor(createdHoursAgo / 24);
      const daysAgoText = createdDaysAgo === 1 ? ' day ago' : ' days ago';
      return createdDaysAgo + daysAgoText;
    } else {
      const hoursAgoText = createdHoursAgo === 1 ? ' hour ago' : ' hours ago';
      return createdHoursAgo + hoursAgoText;
    }
  };

  const renderVerifyDeleteModal = () => {
    return (
      <Modal
        show={showVerifyDeleteModal}
        onHide={toggleVerifyDeleteModal}
        animation={false}
        centered
        size='sm'
      >
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleVerifyDeleteModal}>
            No
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const toggleReplyBlock = () => {
    setShowReplyBlock(!showReplyBlock);
  };

  const toggleEditBlock = () => {
    setShowEditBlock(!showEditBlock);
  };

  const handleHideComment = (id) => {
    if (hiddenComments.indexOf(id) > -1) {
      const filteredComments = hiddenComments.filter((_id) => _id !== id);
      setHiddenComments(filteredComments);
    } else {
      setHiddenComments((prevArray) => [...prevArray, id]);
    }
  };

  const toggleVerifyDeleteModal = () => {
    setShowVerifyDeleteModal(!showVerifyDeleteModal);
  };

  const handleDelete = () => {
    const post = {
      user: '[deleted]',
      comment: '[removed]',
      repliedToId: props.post.repliedToId,
    };
    axios
      .post('posts/update/' + props.post._id, post)
      .then((res) => console.log(res.data))
      .then(props.fetchComments)
      .then(toggleVerifyDeleteModal);

    // axios
    //   .delete('posts/' + props.post._id)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .then(props.fetchComments)
    //   .then(toggleVerifyDeleteModal);
  };

  return <>{renderComments()}</>;
};

export default Comments;
