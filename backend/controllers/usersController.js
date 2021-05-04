import bcrypt from 'bcryptjs';
import Users from '../models/Users.js'
// update user
const updateUser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)

            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
             const user = await Users.findByIdAndUpdate(req.params.id, {
                 $set: req.body
             })
             res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you can update onle your account!")
    }
}
// delete user
const deleteUser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
             await Users.findByIdAndDelete({ _id: req.params.id})
             return res.status(200).json("Account has been deleted")
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you can delete onle your account!")
    }
}
// get a user
const getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username
    try {
        const user = userId ? await Users.findById(userId) : await Users.findOne({username: username})
        const { password, updatedAt, ...other} = user._doc
        return res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(other)
    }
}
// follow a user
const followUser = async (req, res) => {
    if(req.body.userId !== req.body.id) {
        try {
            const user = await Users.findById(req.params.id);
            const currentUser = await Users.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push:{followers: req.body.userId}});
                await currentUser.updateOne({$push:{followings: req.params.id}});
                return res.status(200).json("user has been followed")
            } else {
                return res.status(403).json("you allready follow this user")
            }
        } catch (error) {
            return res.status(500).json(error)
        }

    } else {
        return res.status(403).json("you cant follow yourself")
    }
}

// unfollow a user
const unfollowUser = async (req, res) => {
    if(req.body.userId !== req.body.id) {
        try {
            const user = await Users.findById(req.params.id);
            const currentUser = await Users.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull:{followers: req.body.userId}});
                await currentUser.updateOne({$pull:{followings: req.params.id}});
                return res.status(200).json("user has been unfollowed")
            } else {
                return res.status(403).json("you dont follow this user")
            }
        } catch (error) {
            return res.status(500).json(error)
        }

    } else {
        return res.status(403).json("you cant unfollow yourself")
    }
}

//get friends friends/:userId

const getFriends = async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return Users.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => { 
           
            const { _id, username, profilePicture} = friend;
            return friendList.push({ _id, username, profilePicture})
        })
       return res.status(200).json(friendList)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unfollowUser,
    getFriends,
}