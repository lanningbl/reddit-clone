import React from 'react';
import { IoIosLink } from 'react-icons/io';
import { MdImage } from 'react-icons/md';

import './CreatePostCard.scss';
import CreatePostModal from '../CreatePostModal';

const CreatePostCard = (props) => {
  return (
    <div className='create-post-card-container'>
      <img src={require('../../assets/img/reddit-profile.png')} />
      <CreatePostModal fetchPosts={props.fetchPosts()} />
      <div className='post-type'>
        <div className='post-btn'>
          <MdImage size={26} />
        </div>
        <div className='post-btn'>
          <IoIosLink size={24} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
