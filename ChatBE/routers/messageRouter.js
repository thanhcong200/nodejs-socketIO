const router = require('express').Router();
const messageController = require('../controllers/messageController');
const { catchErrors } = require('../handles/errorHandles');

router.get('/', catchErrors(messageController.messageRoom));

module.exports = router;



