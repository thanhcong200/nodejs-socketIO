require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


mongoose.connection.on("error", (err)=>{
    console.log("Mongoose connection error: " + err.message);
});


mongoose.connection.once('open', ()=>{
    console.log("MongoDB connected!");
});


require('./models/User');
require('./models/Chatroom');
require('./models/User');



app.listen(3000, ()=> console.log('Running at 3000 port.'));


