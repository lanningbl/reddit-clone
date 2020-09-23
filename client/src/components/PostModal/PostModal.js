import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { MdImage, MdClose } from 'react-icons/md';

import './PostModal.scss';
import Modal from '../Modal';
import Post from '../Post';
// import Comments from '../Comments';
import CommentForm from '../CommentForm';

const PostModal = (props) => {
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState([]);
  const [dropdownTitle, setDropdownTitle] = useState('New');
  const [sortByOldest, setSortByOldest] = useState(false);
  const [sortByNewest, setSortByNewest] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { show, onHide, post } = props;

  // const fetchComments = async () => {
  //   try {
  //     const response = await axios.get('comments/');
  //     setComments(response.data);
  //     setIsLoading(false);
  //     console.log('Fetching comments...');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const renderHeader = () => {
    return (
      <div className='postModal__header'>
        <div className='header-left'>
          <div className='vote-arrows'>
            <div className='up-arrow'>
              <GoArrowUp size={20} />
            </div>
            <span className='votes'>{post.points}</span>
            <div className='down-arrow'>
              <GoArrowDown size={20} />
            </div>
          </div>
          <div className='image-icon'>
            <MdImage size={20} />
          </div>
          <span className='header-title'>{post.title}</span>
        </div>
      </div>
    );
  };

  // const renderComments = (id) => {
  //   return comments
  //     .filter((comment) => !comment.parent_id)
  //     .sort((x, y) =>
  //       sortByNewest
  //         ? x.createdAt < y.createdAt
  //           ? 1
  //           : -1
  //         : sortByOldest && (x.createdAt > y.createdAt ? 1 : -1)
  //     )
  //     .map((comment) => (
  //       <div className='initial-comment' key={comment._id}>
  //         <Comments
  //           comment={comment}
  //           hiddenComments={hiddenComments}
  //           setHiddenComments={setHiddenComments}
  //           fetchComments={fetchComments}
  //           renderChildComment={renderChildComment}
  //         />
  //       </div>
  //     ));
  // };

  // const renderChildComment = (parentId) => {
  //   return comments
  //     .filter((comment) => comment.parent_id === parentId)
  //     .sort((x, y) =>
  //       sortByNewest
  //         ? x.createdAt < y.createdAt
  //           ? 1
  //           : -1
  //         : sortByOldest && (x.createdAt > y.createdAt ? 1 : -1)
  //     )
  //     .map((comment) => (
  //       <div key={comment._id}>
  //         <Comments
  //           comment={comment}
  //           hiddenComments={hiddenComments}
  //           setHiddenComments={setHiddenComments}
  //           fetchComments={fetchComments}
  //           renderChildComment={renderChildComment}
  //         />
  //       </div>
  //     ));
  // };

  // const renderDropdown = () => {
  //   return (
  //     <Dropdown>
  //       <Dropdown.Toggle>
  //         SORT BY <span className='dropdown-title'>{dropdownTitle}</span>
  //       </Dropdown.Toggle>
  //       <Dropdown.Menu alignRight>
  //         <Dropdown.Item eventKey='1' onClick={sortNewest}>
  //           <span className={sortByNewest ? 'active' : ''}>New</span>
  //         </Dropdown.Item>
  //         <Dropdown.Item eventKey='2' onClick={sortOldest}>
  //           <span className={sortByOldest ? 'active' : ''}>Old</span>
  //         </Dropdown.Item>
  //       </Dropdown.Menu>
  //     </Dropdown>
  //     // <select className='dropdown' name={'SORT BY ' + dropdownTitle}>
  //     //   <option onClick={sortNewest}>New</option>
  //     //   <option onClick={sortOldest}>Old</option>
  //     // </select>
  //   );
  // };

  // const sortNewest = () => {
  //   setDropdownTitle('New');
  //   setSortByNewest(true);
  //   setSortByOldest(false);
  // };

  // const sortOldest = () => {
  //   setDropdownTitle('Old');
  //   setSortByOldest(true);
  //   setSortByNewest(false);
  // };

  const modalContent = () => {
    return (
      <>
        {renderHeader()}
        <div className='card'>
          <Post post={post} imageStyle={{ maxHeight: '700px' }} />
          {/* <div className='comment-form'> */}
          <CommentForm
            user_id='Brady'
            post_id='1'
            // fetchComments={fetchComments}
          />
          {/* {renderDropdown()} */}
          {/* <hr className='dropdown-hr' /> */}
          {/* </div> */}
          {/* <div className='comments'>{renderComments()}</div> */}
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      // <Spinner className='spinner' animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
      // </Spinner>
    );
  }

  return (
    <Modal
      triggerText={
        <Post
          post={post}
          voteStyle={{
            backgroundColor: 'rgb(248, 249, 250)',
          }}
        />
      }
      modalContent={modalContent()}
      triggerStyle='post__card'
      modalStyle='post__modal'
    />
  );
};

export default PostModal;
