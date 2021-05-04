import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 20,
        unique: true,
        require: true
    },
    email: {
        type: String,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: String,
        enum: [1,2,3]
    },
}, {
    timestamps: true,
});

const Users = mongoose.model('Users', UsersSchema);
export default Users;