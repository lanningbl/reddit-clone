import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Card, Spinner } from 'react-bootstrap';

import './HomePage.scss';
import CreatePostCard from '../components/CreatePostCard';
import CreateCommunityCard from '../components/CreateCommunityCard';
// import Post from '../components/Post';
import PostModal from '../components/PostModal';
import CreatePostModal from '../components/CreatePostModal';

const CommunityPage = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    const requestBody = {
      query: `
        query {
          posts {
            _id
            user {
              _id
              name
            }
            community {
              name
              logo
            }
            points
            title
            text
            image_url
            created_comments {
              _id
            }
            created_at
            updated_at
          }
        }
      `,
    };

    axios
      .post('/graphql', requestBody)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        setPosts(res.data.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPosts();
    setIsLoading(false);
  }, []);

  const renderPosts = () => {
    return (
      posts
        // .filter((post) => !comment.parent_id)
        // .sort((x, y) =>
        //   sortByOldest
        //     ? x.createdAt < y.createdAt
        //       ? 1
        //       : -1
        //     : sortByNewest && (x.createdAt > y.createdAt ? 1 : -1)
        // )
        .map((post) => (
          <PostModal post={post} />
          // <div
          //   className='card'
          //   key={post._id}
          //   onClick={() => togglePostModal(post)}
          // >
          //   <Post post={post} />
          // </div>
        ))
    );
  };

  const togglePostModal = (post) => {
    setShowPostModal(!showPostModal);
    setPost(post);
  };

  if (isLoading) {
    return (
      // <Spinner className='spinner' animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
      // </Spinner>
    );
  }

  return (
    <div className='subreddit-container'>
      <main>
        {/* <CreatePostCard fetchPosts={fetchPosts} /> */}
        {/* <PostModal show={showPostModal} onHide={togglePostModal} post={post} /> */}
        {renderPosts()}
      </main>
      <aside>
        <CreateCommunityCard />
        {/* <Card>
          <div className='aside-community-banner'>
            Today's Top Growing Communities
          </div>
          r/battlestations
        </Card>
        <Card>Trending Communities JOIN</Card>
        <Card>Home CREATE POST CREATE COMMUNITY</Card>
        <Card>Footer goes here</Card> */}
      </aside>
    </div>
  );
};

export default CommunityPage;
