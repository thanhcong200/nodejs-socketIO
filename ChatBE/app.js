const express = require('express');
const user = require('./routers/userRouter')
const chatroomRouter = require('./routers/chatroomRouter')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('cors')());
app.use('/user', user);
app.use('/chatroom', chatroomRouter);

const errorHandlers = require('./handles/errorHandles');

app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if(process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;