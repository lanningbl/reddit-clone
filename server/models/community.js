const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  rules: [{ type: String, required: false }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  logo: { type: String, required: false },
  banner: { type: String, required: false },
  created_at: { type: Date, default: Date.now() },
  created_posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('Community', communitySchema);
