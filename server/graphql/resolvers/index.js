const communityResolver = require('./communities');
const postResolver = require('./posts');
const postPointResolver = require('./postPoints');
const commentResolver = require('./comments');
const authResolver = require('./auth');

module.exports = {
  ...communityResolver,
  ...postResolver,
  ...postPointResolver,
  ...commentResolver,
  ...authResolver,
};
