import Users from '../models/Users.js';
import bcrypt from 'bcryptjs';

const authUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUsers = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUsers.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const registerUser = async (req, res) => {
    try {
        const user = await Users.findOne({email: req.body.email});
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(404).json("wrong password");

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

}

export {
    authUser,
    registerUser,
}