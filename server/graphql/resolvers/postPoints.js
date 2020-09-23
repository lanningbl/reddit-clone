const PostPoint = require('../../models/postPoint');
const { findOneAndUpdate } = require('../../models/postPoint');

module.exports = {
  postPoints: async ({ postId }) => {
    try {
      const postPoints = await PostPoint.find({ post: postId });
      return postPoints;
    } catch (err) {
      throw err;
    }
  },
  createPostPoint: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }
    const postPoint = new PostPoint({
      post: args.postPointInput.post,
      user: args.postPointInput.user,
      point: args.postPointInput.point,
    });
    try {
      const pointByUserExists = await PostPoint.findOne({
        post: args.postPointInput.post,
        user: args.postPointInput.user,
      });
      let result;
      if (!pointByUserExists) {
        result = await postPoint.save();
      } else if (pointByUserExists.point === args.postPointInput.point) {
        result = await PostPoint.findByIdAndRemove({
          _id: pointByUserExists._id,
        });
      } else {
        result = await PostPoint.findOneAndUpdate(
          { _id: pointByUserExists._id },
          { point: args.postPointInput.point },
          { new: true }
        );
      }

      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },
};
