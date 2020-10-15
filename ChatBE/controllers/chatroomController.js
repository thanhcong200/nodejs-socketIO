const mongoose = require('mongoose');
const User = require('../models/User');
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async(req, res) => {
    const {name} = req.body;
    const nameRegex = /^[A-Za-z\s]+$/;
    if( !nameRegex.test(name)) throw "Chatroom name can contain only alphabets!";
    const chatroomExists = await Chatroom.findOne({name});
    if(chatroomExists) throw "Chatroom name have already!";
    const chatroom = new Chatroom({name});
    await chatroom.save();
    const users = await User.find({});
    const rooms = await Chatroom.find({});
    res.json({
        users,
        rooms
    });
};


exports.getAllChatroom = async(req, res) => {
    const chatrooms = await Chatroom.find({});
    res.json(chatrooms);
}