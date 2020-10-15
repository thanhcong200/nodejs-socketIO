const router = require('express').Router();
const { catchErrors} = require('../handles/errorHandles');
const chatroomController = require('../controllers/chatroomController');

const auth = require('../middlewares/auth');

router.get('/', catchErrors(chatroomController.getAllChatroom));
router.post('/',catchErrors(chatroomController.createChatroom));

module.exports = router;