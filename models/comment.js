const mongoose = require("mongoose");
const Autopopulate = require('../utils/autopopulate');
const Schema = mongoose.Schema;
const User = require("./user")
const Post = require("./post")

const CommentSchema = new Schema ({
  content: { type: String, required: true },
  // author : { type: Schema.Types.ObjectId, ref: "User" },
  // post: { type: Schema.Types.ObjectId, ref: "Post"}
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}).pre('findOne', Autopopulate('comments'))
	.pre('find', Autopopulate('comments'));

module.exports = mongoose.model("Comment", CommentSchema);
