const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user")
const Post = require("./post")

const CommentSchema = new Schema ({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post"}
});

module.exports = mongoose.model("Comment", CommentSchema);
