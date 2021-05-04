import Message from '../models/Message.js';

// Add

const addPost = async (req, res) => {
    const newMessage = await new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
}
 // get Message
const getMessage = async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export {
    addPost,
    getMessage,
}