const mongoose = require("mongoose");
const Autopopulate = require('../utils/autopopulate');
const Schema = mongoose.Schema;
const Comment = require("./comment")
const User = require("./user")

const PostSchema = new Schema({
  title: { type: String, required: true },
  // subreddit: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  // comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],

  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  // author: { type: Schema.Types.ObjectId, ref: "User"}
}).pre('findOne', Autopopulate('comments'))
	.pre('find', Autopopulate('comments'));

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
