const Community = require('../../models/community');
const Post = require('../../models/post');
const User = require('../../models/user');
const { transformPost } = require('./merge');

module.exports = {
  posts: async () => {
    const posts = await Post.find();
    try {
      return posts.map((post) => {
        return transformPost(post);
      });
    } catch (err) {
      throw err;
    }
  },
  createPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }
    const post = new Post({
      community: args.postInput.community,
      user: req.user_id,
      points: 0,
      title: args.postInput.title,
      text: args.postInput.text,
      image_url: args.postInput.image_url,
    });
    let createdPost;
    try {
      const result = await post.save();
      createdPost = transformPost(result);

      const user = await User.findById(req.user_id);
      if (!user) {
        throw new Error('User not found.');
      }
      const community = await Community.findById(post.community);
      if (!community) {
        throw new Error('Community not found.');
      }

      user.created_posts.push(post);
      await user.save();
      community.created_posts.push(post);
      await community.save();

      return createdPost;
    } catch (err) {
      throw err;
    }
  },
};
