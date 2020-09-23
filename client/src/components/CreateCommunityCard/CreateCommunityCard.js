import React from 'react';

import './CreateCommunityCard.scss';
import CreatePostModal from '../CreatePostModal';
import CreateCommunityModal from '../CreateCommunityModal';

const CreateCommunityCard = () => {
  return (
    <div className='create-community-card'>
      <div className='create-community-card__banner' />
      <div className='create-community-card__header'>
        <div className='create-community-card__logo' />
        <div className='create-community-card__title'>Home</div>
      </div>
      <div className='create-community-card__text'>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </div>
      <CreatePostModal />
      <CreateCommunityModal />
    </div>
  );
};

export default CreateCommunityCard;
