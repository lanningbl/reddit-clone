const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postPointSchema = new Schema({
  post: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  point: { type: Number, required: true },
});

postPointSchema.index({ post: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('PostPoint', postPointSchema);
