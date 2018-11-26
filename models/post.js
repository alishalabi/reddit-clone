const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment")
const User = require("./user")

const PostSchema = new Schema({
  title: { type: String, required: true },
  subreddit: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
  author: { type: Schema.Types.ObjectId, ref: "User"}
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
