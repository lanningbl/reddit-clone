import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';

import './CreateCommunityModal.scss';
import AuthContext from '../../contexts/auth-context';
import Modal from '../Modal';

const CreateCommunityModal = () => {
  const { userId, token } = useContext(AuthContext);

  const nameEl = useRef();
  const titleEl = useRef();
  const rulesEl = useRef();
  const bannerEl = useRef();
  const logoEl = useRef();

  const handleCreateCommunity = (e) => {
    e.preventDefault();

    const name = nameEl.current.value;
    const title = titleEl.current.value;
    const rules = rulesEl.current.value;
    const banner = bannerEl.current.value;
    const logo = logoEl.current.value;

    const requestData = {
      query: `
        mutation {
          createCommunity(communityInput:{owner:"${userId}", name:"${name}", title:"${title}", rules:["${rules}"], members:["${userId}"], logo:"${logo}", banner:"${banner}"}) {
            _id
            title
          }
        }
      `,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post('http://localhost:5000/graphql', requestData, config)
      .then((res) => {
        if (res.status !== 200 && res.status != 201) {
          throw new Error('Failed!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const form = () => {
    const input = [
      { ref: nameEl, label: 'community name' },
      { ref: titleEl, label: 'community title' },
      { ref: rulesEl, label: 'rules - temp' },
      { ref: logoEl, label: 'logo' },
      { ref: bannerEl, label: 'banner' },
    ];

    return (
      <>
        {input.map((i) => {
          return (
            <div className='create-community-modal__form-control'>
              <input
                className='create-community-modal__input'
                type='text'
                ref={i.ref}
                required
              />
              <label className='create-community-modal__label'>{i.label}</label>
            </div>
          );
        })}
        <div
          className='create-community-modal__submit-btn'
          onClick={handleCreateCommunity}
        >
          CREATE COMMUNITY
        </div>
      </>
    );
  };

  const modalContent = () => {
    return (
      <>
        <div className='create-community-modal__title'>Create a Community</div>
        {/* {form()} */}
        <Input ref={nameEl} label='community name' required />
        <Input ref={titleEl} label='community title' required />
        <Input ref={rulesEl} label='rules - temp' />
        <Input ref={logoEl} label='logo' />
        <Input ref={bannerEl} label='banner' />
        <div
          className='create-community-modal__submit-btn'
          onClick={handleCreateCommunity}
        >
          CREATE COMMUNITY
        </div>
      </>
    );
  };

  return (
    <Modal
      triggerText='CREATE COMMUNITY'
      modalContent={modalContent()}
      triggerStyle='primary-inverted create-community-modal__btn'
      modalStyle='create-community-modal__modal'
    />
  );
};

export default CreateCommunityModal;

const Input = ({ ref, label, required }) => {
  console.log(label, required);
  return (
    <div className='create-community-modal__form-control'>
      <input
        className='create-community-modal__input'
        type='text'
        ref={ref}
        required={required}
      />
      <label className='create-community-modal__label'>{label}</label>
    </div>
  );
};
