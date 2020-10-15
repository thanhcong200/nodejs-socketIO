const mongoose = require('mongoose');
const User = require('../models/User');
const Message = mongoose.model('Message');


exports.messageRoom = async(req, res) => {
    const messages = await Message.find({});
    res.json(messages);
}