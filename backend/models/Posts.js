import mongoose from 'mongoose';

const PostsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 500
    },
}, {
    timestamps: true,
});

const Posts = mongoose.model('Posts', PostsSchema);
export default Posts;