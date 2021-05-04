import Conversation from '../models/Conversation.js';

//new conversation

const createnewConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//get a conversation of a user
const getUserConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}


// get conversation includes two userId
const getTwouserId = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId]},
        });
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export {
    createnewConversation,
    getUserConversation,
    getTwouserId,
}