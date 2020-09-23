import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GoPlus } from 'react-icons/go';
import { BsTagFill } from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';

import './CreatePostModal.scss';
import AuthContext from '../../contexts/auth-context';
import Modal from '../Modal';
import CommunityDropdown from '../CommunityDropdown';

const CreatePostModal = (props) => {
  const { userId, token } = useContext(AuthContext);
  const { fetchPosts } = props;

  const [key, setKey] = useState('post');
  const titleEl = useRef();
  const textEl = useRef();
  const imageUrlEl = useRef();
  const [isNotificationsChecked, setIsNotificationsChecked] = useState(true);
  const [communities, setCommunities] = useState();
  const [selectedCommunity, setSelectedCommunity] = useState();

  const fetchCommunities = () => {
    const requestBody = {
      query: `
        query {
          communities {
            _id
            name
          }
        }
      `,
    };

    axios
      .post('http://localhost:5000/graphql', requestBody)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        setCommunities(res.data.data.communities);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   fetchCommunities();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCommunity === undefined) {
      console.log('community is undefined');
      return;
    }

    const community = selectedCommunity._id;
    const user = userId;
    const title = titleEl.current.value;

    let requestData;
    if (key === 'post') {
      const text = textEl.current.value;
      requestData = {
        query: `
          mutation {
            createPost(postInput: {community:"${community}", user:"${user}", title:"${title}", text:"${text}"}) {
              _id
            }
          }
        `,
      };
    } else if (key === 'link') {
      const imageUrl = imageUrlEl.current.value;
      requestData = {
        query: `
          mutation {
            createPost(postInput: {community:"${community}", user:"${user}", title:"${title}", image_url:"${imageUrl}"}) {
              _id
            }
          }
        `,
      };
    }

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
        closeModal();
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // resize textarea found on stackoverflow by DreamTeK
  // const tx = document.getElementsByTagName('textarea');
  // for (let i = 0; i < tx.length; i++) {
  //   tx[i].setAttribute(
  //     'style',
  //     'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
  //   );
  //   tx[i].addEventListener('input', OnInput, false);
  // }
  // function OnInput() {
  //   this.style.height = 'auto';
  //   this.style.height = this.scrollHeight + 'px';
  // }

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.open();
    // fetchCommunities();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  return (
    <div className='create-post-container'>
      <div className='create-post-btn' onClick={openModal}>
        Create Post
      </div>
      <Modal ref={modalRef}>
        <header>
          Create a post
          <span className='drafts'>
            DRAFTS <div className='badge'>0</div>
          </span>
        </header>
        <CommunityDropdown
          communities={communities}
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
        />
        <div className='modal-body'>
          <div className='post-type-button-group'>
            <div
              className={key === 'post' ? 'btn btn-active' : 'btn'}
              onClick={() => {
                setKey('post');
              }}
            >
              Post
            </div>
            <div
              className={key === 'image' ? 'btn btn-active' : 'btn'}
              onClick={() => {
                setKey('image');
              }}
            >
              Image & Video
            </div>
            <div
              className={key === 'link' ? 'btn btn-active' : 'btn'}
              onClick={() => {
                setKey('link');
              }}
            >
              Link
            </div>
            <div
              className={
                key === 'poll' ? 'btn last-btn btn-active' : 'btn last-btn'
              }
              onClick={() => {
                setKey('poll');
              }}
            >
              Poll
            </div>
          </div>
          <div className='create-post-container'>
            <main>
              <input type='text' ref={titleEl} placeholder='Title' />
              {key === 'post' || key === 'poll' ? (
                <textarea
                  className='post-textarea'
                  ref={textEl}
                  placeholder='Text (optional)'
                />
              ) : key === 'image' ? (
                <div className='image-box'>
                  Drag and drop or <div className='btn'>UPLOAD</div>
                </div>
              ) : key === 'link' ? (
                <textarea
                  className='link-textarea'
                  ref={imageUrlEl}
                  placeholder='Url'
                  rows='2'
                />
              ) : (
                key === 'poll' && <div>poll spot</div>
              )}
              <div className='button-groups'>
                <div className='tag-button-group'>
                  <div className='btn tag-disabled'>
                    <GoPlus size={15} />
                    &nbsp;OC
                  </div>
                  <div className='btn tag-enabled'>
                    <GoPlus size={15} />
                    &nbsp;SPOILER
                  </div>
                  <div className='btn tag-enabled'>
                    <GoPlus size={15} />
                    &nbsp;NSFW
                  </div>
                  <div className='btn tag-disabled'>
                    <BsTagFill size={15} />
                    &nbsp;FLAIR&nbsp;
                    <AiFillCaretDown />
                  </div>
                </div>
                <div className='submit-button-group'>
                  <div className='btn cancel-btn'>CANCEL</div>
                  <div className='btn post-btn' onClick={handleSubmit}>
                    POST
                  </div>
                </div>
              </div>
            </main>
            <footer>
              <label htmlFor='notifications'>
                <input
                  type='checkbox'
                  id='notifications'
                  checked={isNotificationsChecked}
                  onChange={() =>
                    setIsNotificationsChecked(!isNotificationsChecked)
                  }
                />
                Send me post reply notifications
              </label>
            </footer>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
