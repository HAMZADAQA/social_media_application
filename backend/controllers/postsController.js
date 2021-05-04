import Posts from '../models/Posts.js';
import Users from '../models/Users.js';
// create a post
const createPost = async (req, res) => {
    const newPost = new Posts(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        return res.status(500).json(error)
    }
}

// update a post
const updatePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body});
            return res.status(200).json("the post has been updated")
        } else {
            return res.status(403).json("you can update onley your post")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

// delete a post
const deletePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne({ $set: req.body});
            return res.status(200).json("the post has been deleted")
        } else {
            return res.status(403).json("you can delete onley your post")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

// like  / dislike a post
const likePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            return res.status(200).json("The post has been liked")

        } else {
            await post.updateOne({$pull: { likes: req.body.userId}});
            return res.status(200).json("The post has been disliked")
        }
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

// get a post
const getPost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// get timeline posts
const timelineposts = async (req, res) => {
    try {
        const currentUser = await Users.findById(req.params.userId);
        const userPosts = await Posts.find({ userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Posts.find({ userId: friendId})
            })
        )
        return res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        return res.status(500).json(error);
    }
}


// get users all posts
const usersPosts = async (req, res) => {
   try {
       const user = await Users.findOne({username: req.params.username})
       const posts = await Posts.find({userId: user._id})
    return res.status(200).json(posts)
   } catch (error) {
       return res.status(500).json(error)
   }
}

export {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    timelineposts,
    usersPosts,
}