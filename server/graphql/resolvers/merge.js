const DataLoader = require('dataloader');

const Community = require('../../models/community');
const Post = require('../../models/post');
const Comment = require('../../models/comment');
const User = require('../../models/user');

const userLoader = new DataLoader(async (userIds) => {
  // return User.find({ _id: { $in: userIds } }); doesn't work
  const users = await User.find({ _id: { $in: userIds } });
  users.sort((a, b) => {
    return (
      userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
    );
  });
  return users;
});

const communityLoader = new DataLoader(async (communityIds) => {
  // return Community.find({ _id: { $in: communityIds } }); doesn't work
  const communities = await Community.find({ _id: { $in: communityIds } });
  communities.sort((a, b) => {
    return (
      communityIds.indexOf(a._id.toString()) -
      communityIds.indexOf(b._id.toString())
    );
  });
  return communities;
});

const postLoader = new DataLoader((postIds) => {
  return posts(postIds);
});

const commentLoader = new DataLoader((commentIds) => {
  return comments(commentIds);
});

const community = async (communityId) => {
  try {
    const community = await communityLoader.load(communityId.toString());
    return transformCommunity(community);
  } catch (err) {
    throw err;
  }
};

const posts = async (postIds) => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    posts.sort((a, b) => {
      return (
        postIds.indexOf(a._id.toString()) - postIds.indexOf(b._id.toString())
      );
    });
    return posts.map((post) => {
      return transformPost(post);
    });
  } catch (err) {
    throw err;
  }
};

const comments = async (commentIds) => {
  try {
    const comments = await Comment.find({ _id: { $in: commentIds } });
    comments.sort((a, b) => {
      return (
        commentIds.indexOf(a._id.toString()) -
        commentIds.indexOf(b._id.toString())
      );
    });
    return comments.map((comment) => {
      return transformComment(comment);
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

const transformCommunity = (community) => {
  return {
    ...community._doc,
    owner: user.bind(this, community.owner),
    created_posts: () => postLoader.loadMany(community.created_posts),
    members: () => community.members.map((member) => user(member)),
  };
};

const transformPost = (post) => {
  return {
    ...post._doc,
    user: user.bind(this, post.user),
    community: community.bind(this, post.community),
    created_comments: () => commentLoader.loadMany(post.created_comments),
  };
};

const transformComment = (comment) => {
  return {
    ...comment._doc,
    user: user.bind(this, comment.user),
  };
};

const transformUser = async (user) => {
  try {
    return {
      ...user._doc,
      password: null,
      created_posts: () => postLoader.loadMany(user.created_posts),
    };
  } catch (err) {
    throw err;
  }
};

exports.transformUser = transformUser;
exports.transformCommunity = transformCommunity;
exports.transformPost = transformPost;
exports.transformComment = transformComment;
