require('dotenv').config();
const mongoose = require('mongoose');

const jwt = require('jwt-then');
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
require('./models/Message');

const app = require('./app');
const User = require('./models/User');
const Message = require('./models/Message');

const server = app.listen(5000, ()=> console.log('Running at 5000 port.'));
const io = require('socket.io')(server);
// io.use(async(socket, next) => {
//     try{
//         /**  socket.handsake: which connect with user frontend :
//         {
//             headers: the headers sent as part of the handshake,
//             time: the date of creation (as string),
//             address: the ip of the client,
//             xdomain: whether the connection is cross-domain ,
//             secure: whether the connection is secure ,
//             issued: the date of creation (as unix timestamp) ,
//             url: the request URL string ,
//             query: the query object 
//         }
//         */
//         const token = socket.handsake.query.token;
//         const payload = await jwt.verify(token, process.env.SECRET);
//         socket.userId = payload.id;
//         next();
//     } catch(err){
//         console.log(err);
//     };
// });

io.on('connection', (socket) => {
    // console.log('Connected: ' + socket.userId);
    socket.on('disconnect', () => {
        console.log('Disconnected: ' );
    });

    socket.on('joinRoom', ({idRoom})=>{
        socket.join(idRoom);
        console.log('Join success id room: ' + idRoom);
    });

    socket.on('leaveRoom', ({idRoom}) => {
        socket.leave(idRoom);
        console.log('Leaved id room: ' + idRoom);
    })

    socket.on('messageRoom', async({idRoom, message, userId})=>{
        
        const user = await User.findOne({_id: userId});
        if(message.trim().length > 0 && user){
            
            
            const newMessage = new Message({
                chatroom: idRoom,
                user: userId,
                message
            });
          
            
            io.to(idRoom).emit('newMessage', {
                    message,
                    chatroom: idRoom,
                    user: userId
                })
            await newMessage.save();

        }
    })
})





