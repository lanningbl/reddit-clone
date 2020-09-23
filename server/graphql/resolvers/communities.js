const Community = require('../../models/community');
const { transformCommunity } = require('./merge');

module.exports = {
  community: async ({ name }) => {
    try {
      const community = await Community.findOne({ name: name });
      if (!community) {
        throw new Error('Community does not exist!');
      }
      return transformCommunity(community);
    } catch (err) {
      throw err;
    }
  },
  communities: async () => {
    const communities = await Community.find();
    try {
      return communities.map((community) => {
        return transformCommunity(community);
      });
    } catch (err) {
      throw err;
    }
  },
  createCommunity: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('User is unauthenticated!');
    }
    const community = new Community({
      owner: req.user_id,
      name: args.communityInput.name,
      title: args.communityInput.title,
      rules: args.communityInput.rules,
      members: args.communityInput.members,
      logo: args.communityInput.logo,
      banner: args.communityInput.banner,
      created_at: new Date(),
    });
    try {
      const result = await community.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },
};
