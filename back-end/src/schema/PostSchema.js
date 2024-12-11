import mongoose from "mongoose";
const PostSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  caption: {
    type: String,
    required: true,
  },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });
const Post = mongoose.model("Post", PostSchema);
export default Post;
