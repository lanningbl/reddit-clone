const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    // create validation for user register form to replace findOne
    try {
      const existingEmail = await User.findOne({ email: args.userInput.email });
      if (existingEmail) {
        throw new Error('A user with this email already exists.');
      }
      const existingName = await User.findOne({ name: args.userInput.name });
      if (existingName) {
        throw new Error('A user with this name already exists.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword,
        created_at: new Date(),
      });

      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ name, password }) => {
    try {
      const user = await User.findOne({ name: name });
      if (!user) {
        throw new Error('User does not exist!');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect!');
      }
      const token = jwt.sign(
        { user_id: user.id, name: user.name },
        'somesupersecretkey',
        {
          expiresIn: '1h',
        }
      );
      return { user_id: user._id, token: token, token_expiration: 1 };
    } catch (err) {
      throw err;
    }
  },
};
