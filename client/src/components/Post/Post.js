import React, { useContext, useEffect, useState } from 'react';
import { GoArrowUp, GoArrowDown, GoCircleSlash } from 'react-icons/go';
import axios from 'axios';
import { FaCommentAlt, FaGift } from 'react-icons/fa';
import { IoIosShareAlt, IoMdFlag } from 'react-icons/io';
import { FaFolderPlus } from 'react-icons/fa';
import { format, formatDistance } from 'date-fns';

import './Post.scss';
import AuthContext from '../../contexts/auth-context';
import Auth from '../Auth';

const Post = (props) => {
  const {
    _id,
    community,
    user,
    // points,
    title,
    text,
    image_url,
    created_comments,
    created_at,
    updated_at,
  } = props.post;
  const { userId, token, logout } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [userPoint, setUserPoint] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPoints();
    setIsLoading(false);
    if (!token) {
      setUserPoint(null);
    }
  }, [token]);

  const fetchPoints = () => {
    const requestData = {
      query: `
          query {
            postPoints(postId: "${_id}") {
              user
              point
            }
          }
        `,
    };

    axios
      .post('http://localhost:5000/graphql', requestData)
      .then((res) => {
        const postPoints = res.data.data.postPoints;
        let pointTotal = 0;
        postPoints.map((postPoint) => {
          pointTotal += postPoint.point;
          if (userId === postPoint.user) {
            setUserPoint(postPoint.point);
          }
        });
        setPoints(pointTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJoinCommunity = (e) => {
    e.stopPropagation();
    console.log('Join button clicked');
    return <Auth signup />;
  };

  const handlePoint = (e, point) => {
    e.stopPropagation();
    console.log(point);

    if (point === userPoint) {
      setUserPoint(null);
    } else {
      setUserPoint(point);
    }

    const requestData = {
      query: `
        mutation {
          createPostPoint(postPointInput: {
            post: "${_id}",
            user: "${userId}",
            point: ${point}
          }) {
            post
            user
            point
          }
        }`,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post('http://localhost:5000/graphql', requestData, config)
      .then((res) => {
        console.log(res);
        fetchPoints();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <span className='sr-only'>Loading...</span>;
  }

  return (
    <div className='post'>
      <div className='post__vote-section' style={props.voteStyle}>
        <div
          className={`post__btn post__arrow-up ${
            userPoint === 1 && 'post__arrow-up-active'
          }`}
          onClick={(e) => handlePoint(e, 1)}
        >
          <GoArrowUp />
        </div>
        <span className='post__points'>
          {points === 0 ? <>&#8226;</> : points}
        </span>
        <div
          className={`post__btn post__arrow-down ${
            userPoint === -1 && 'post__arrow-down-active'
          }`}
          onClick={(e) => handlePoint(e, -1)}
        >
          <GoArrowDown />
        </div>
      </div>
      <div className='post__content-section'>
        <div className='post__header'>
          <img className='post__logo' src={community.logo} />
          <span className='post__community-name post__underline-on-hover'>
            {community.name}
          </span>
          &#183; Posted by
          <div className='post__underline-on-hover'>u/{user.name}</div>
          <div className='post__underline-on-hover'>{`${formatDistance(
            new Date(),
            new Date(created_at)
          )} ago`}</div>
          {/* {format(new Date(createdAt), 'MMMM d, yyyy - h:mm aa')} */}
          <div className='post__btn post__join' onClick={handleJoinCommunity}>
            + JOIN
          </div>
        </div>
        <div className='post__title'>{title}</div>
        {text ? (
          <div className='post__text'>{text}</div>
        ) : (
          image_url && (
            <div className='post__image-container'>
              <img
                className='post__image'
                style={props.imageStyle}
                src={image_url}
              />
            </div>
          )
        )}
        <div className='post__btn-group'>
          <div className='post__btn'>
            <FaCommentAlt />
            &nbsp;{`${created_comments.length} Comments`}
          </div>
          {userId !== user._id && (
            <>
              {token && (
                <div className='post__btn'>
                  <FaGift size={16} />
                  &nbsp;Give Award
                </div>
              )}
              <div className='post__btn'>
                <IoIosShareAlt size={18} />
                Share
              </div>
              <div className='post__btn'>
                <FaFolderPlus size={16} />
                &nbsp;Save
              </div>
              <div className='post__btn'>
                <GoCircleSlash size={16} />
                &nbsp;Hide
              </div>
              <div className='post__btn'>
                <IoMdFlag size={16} />
                &nbsp;Report
              </div>
              <div className='post__btn'>&#8226;&#8226;&#8226;</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
