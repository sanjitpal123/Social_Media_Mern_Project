import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'targettype', // Dynamic reference
        required: true
    },
    targettype: {
        type: String,
        required: true,
        enum: ["post", "comment"] // Define allowed models
    }
}, { timestamps: true });

const Like= mongoose.model('Like', likeSchema);
export default Like;
