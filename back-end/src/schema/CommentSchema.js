import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' // Reference to the same Comment model
        }
    ]
}, { timestamps: true }); // Add timestamps if needed

const Comment=mongoose.model('Comment', CommentSchema);
export default Comment;
