const router = require('express').Router();
const userRouter = require('../routers/userRouter');
const chatroomRouter = require('../routers/chatroomRouter');
const messageRouter = require('../routers/messageRouter');

router.use('/user', userRouter);
router.use('/chat', chatroomRouter);
router.use('/message', messageRouter);

module.exports = router;