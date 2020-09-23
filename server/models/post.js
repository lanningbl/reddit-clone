const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    title: { type: String, required: true },
    text: { type: String, required: false },
    image_url: { type: String, required: false },
    created_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Post', postSchema);
