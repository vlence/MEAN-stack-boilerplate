const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: String,
  comment: String,
  // upvote: Number,
  // downvote: Number,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;