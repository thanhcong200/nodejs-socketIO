const mongoose = require('mongoose');
const User = mongoose.model("User");
const sha256 = require('js-sha256');
const jwt = require('jwt-then');


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
        res.json({
            message: "User " + `${name}` + " register successfully."
        });
    };

};


exports.login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT)
    });

    if( !user) throw "Email and password invalid!";
    else {
        const token = await jwt.sign({id: user.id}, process.env.SECRET);
        res.json({
            message: "User logged in successfully.",
            token
        });
    };
};