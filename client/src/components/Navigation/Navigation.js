import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaReddit, FaGithub } from 'react-icons/fa';

import './Navigation.scss';
import AuthContext from '../../contexts/auth-context';
import Auth from '../Auth';
import Modal from '../Modal';

const Navigation = () => {
  const { userId, token, logout } = useContext(AuthContext);

  const renderAuth = () => {
    return !token ? (
      <>
        <Auth login />
        <Auth signup />
      </>
    ) : (
      <div className='btn' onClick={logout}>
        LOG OUT
      </div>
    );
  };

  return (
    <div className='navigation-container'>
      <Link className='logo' to='/'>
        <FaReddit size={36} />
      </Link>
      <Modal close />
      {/* <div>Home `search communities`</div>
      <div>Search bar</div> */}
      {renderAuth()}
      {/* <a className='logo' href='https://github.com/lanningbl' target='_blank'>
        <FaGithub size={36} />
      </a> */}
    </div>
  );
};

export default Navigation;
