const Post = require('../../models/post');
const Comment = require('../../models/comment');
const { transformComment } = require('./merge');

module.exports = {
  comments: async () => {
    const comments = await Comment.find();
    try {
      return comments.map((comment) => {
        return transformComment(comment);
      });
    } catch (err) {
      throw err;
    }
  },
  createComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }
    const comment = new Comment({
      text: args.commentInput.text,
      points: 1,
      user: req.user_id,
      post: req.user_id,
      parent_id: args.commentInput.parent_id,
    });
    let createdComment;
    try {
      const result = await comment.save();
      createdComment = transformComment(result);

      const post = await Post.findById(req.user_id);
      if (!post) {
        throw new Error('Post not found.');
      }
      post.created_comments.push(comment);
      await post.save();

      return createdComment;
    } catch (err) {
      throw err;
    }
  },
};
