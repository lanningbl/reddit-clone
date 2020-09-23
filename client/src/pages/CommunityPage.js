import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Card, Spinner } from 'react-bootstrap';

import './CommunityPage.scss';
import CreatePostCard from '../components/CreatePostCard';
import CreateCommunityCard from '../components/CreateCommunityCard';
// import Post from '../components/Post';
import PostModal from '../components/PostModal';
import CreatePostModal from '../components/CreatePostModal';

const CommunityPage = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCommunity = async () => {
    const communityName = window.location.pathname.substr(1).toString();
    console.log('communityName', communityName);
    const requestBody = {
      query: `
        query {
          community(name: "${communityName}") {
            _id
            name
            title
            rules
            members {
              _id
            }
            created_at
            created_posts {
              _id
              user {
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
              created_at
              updated_at
            }
            logo
            banner
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
        console.log(res.data.data);
        setCommunity(res.data.data.community);
        setPosts(res.data.data.community.created_posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPosts = async () => {
    // const requestBody = {
    //   query: `
    //     query {
    //       posts {
    //         _id
    //         user {
    //           name
    //         }
    //         community {
    //           name
    //           logo
    //         }
    //         points
    //         title
    //         text
    //         image_url
    //         created_comments {
    //           _id
    //         }
    //         created_at
    //         updated_at
    //       }
    //     }
    //   `,
    // };
    // axios
    //   .post('http://localhost:5000/graphql', requestBody)
    //   .then((res) => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Failed!');
    //     }
    //     setPosts(res.data.data.posts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    fetchCommunity();
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
        .map((post) => <PostModal post={post} />)
    );
  };

  // const togglePostModal = (post) => {
  //   setShowPostModal(!showPostModal);
  //   setPost(post);
  // };

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
        {/* {renderPosts()} */}
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
