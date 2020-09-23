import React, { useState } from 'react';

import './CommunityDropdown.scss';

const CommunityDropdown = (props) => {
  const { selectedCommunity, setSelectedCommunity } = props;
  const communities = props.communities || [];
  const [showCommunities, setShowCommunities] = useState(false);
  return (
    <div className='community-dropdown-container'>
      <div
        className='dropdown-click-outside'
        onClick={() => setShowCommunities(false)}
      />
      <div
        className='dropdown-btn'
        onClick={() => {
          setShowCommunities(!showCommunities);
        }}
      >
        <div className='left'>
          <div className='circle' />
          <div>
            {selectedCommunity ? selectedCommunity.name : 'Choose a community'}
          </div>
        </div>
        <span
          className={`${
            showCommunities ? 'dropdown-arrow-up' : 'dropdown-arrow-down'
          }`}
        />
      </div>
      <div style={{ display: showCommunities ? 'block' : 'none' }}>
        <div className='select-box'>
          {communities.map((community) => (
            <div
              className='community-box'
              key={community._id}
              onClick={() => {
                setSelectedCommunity(community);
                setShowCommunities(false);
              }}
            >
              {community.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDropdown;
