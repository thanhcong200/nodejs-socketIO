const mongoose = require('mongoose');
const User = mongoose.model("User");
const sha256 = require('js-sha256');
const jwt = require('jwt-then');
const Chatroom = require('../models/Chatroom');


exports.register = async(req, res) => {
    const {name, email, password} = req.body;
    const emailRegex = /@gmail.com/;
    if( !emailRegex.test(email)) throw "Email is not supported from your domain.";
    if( password.length < 6) throw "Password must be 6 characters long.";

    const userExists = await(User.findOne({email}));
    if(userExists) throw "User have already.";
    else {
        const user = User({
            name,
            email,
            password
        });
        await user.save();
        const token = await jwt.sign({id: user.id}, process.env.SECRET);
        res.json({
            user,
            token
        });
    };

};


exports.login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password
    });
   
    if( !user) throw "Email and password invalid!";
    else {
        const token = await jwt.sign({id: user.id}, process.env.SECRET);
        const rooms = await Chatroom.find({});
        const users = await User.find({});
        res.json({
            rooms,
            user,
            users,
            token
        });
    };
};


exports.getAllUsers = async(req, res) => {
    const users = await User.find({});
    res.json(users);
}