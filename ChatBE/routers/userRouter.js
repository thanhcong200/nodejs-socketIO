const router = require('express').Router();
const { catchErrors}  = require('../handles/errorHandles');
const userController = require('../controllers/userController');

router.get('/', catchErrors(userController.getAllUsers))
router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));

module.exports = router;