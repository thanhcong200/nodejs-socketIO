const router = require('express').Router();
const { catchErrors} = require('../handles/errorHandles');
const chatroomController = require('../controllers/chatroomController');

const auth = require('../middlewares/auth');

router.post('/', auth, catchErrors(chatroomController.createChatroom));