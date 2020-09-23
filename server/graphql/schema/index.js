const { buildSchema } = require('graphql');

module.exports = buildSchema(`
scalar Date

type Community {
  _id: ID!
  name: String!
  title: String!
  rules: [String!]
  members: [User!]!
  created_at: String!
  created_posts: [Post!]
  owner: User!
  logo: String
  banner: String
}

type Post {
  _id: ID!
  community: Community!
  user: User!
  points: Int!
  title: String!
  text: String
  image_url: String
  created_at: Date!
  updated_at: String!
  created_comments: [Comment!]
}

type PostPoint {
  post: String!
  user: String!
  point: Int!
}

type Comment {
  _id: ID!
  text: String!
  points: Int!
  user: User!
  post: Post!
  parent_id: String
  created_at: String!
  updated_at: String!
}

type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  created_at: String!
  created_posts: [Post!]
}

type AuthData {
  user_id: ID!
  token: String!
  token_expiration: Int!
}

input CommunityInput {
  owner: String!
  name: String!
  title: String!
  rules: [String!]
  members: [String!]!
  logo: String
  banner: String
}

input PostInput {
  community: String!
  user: String!
  title: String!
  text: String
  image_url: String
}

input PostPointInput {
  post: String!
  user: String!
  point: Int!
}

input CommentInput {
  text: String!
  user: String!
  post: String!
  parent_id: String
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

type RootQuery {
  communities: [Community!]!
  community(name: String!): Community!
  posts: [Post!]!
  postPoints(postId: String!): [PostPoint!]
  comments: [Comment!]!
  login(name: String!, password: String!): AuthData!
}

type RootMutation {
  createCommunity(communityInput: CommunityInput): Community
  createPost(postInput: PostInput): Post
  createPostPoint(postPointInput: PostPointInput): PostPoint
  createComment(commentInput: CommentInput): Comment
  createUser(userInput: UserInput): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
