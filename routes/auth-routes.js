const router = require('express').Router();

const authController = require('../controllers/auth-controller');
const authValidator = require('../validation/auth-validator');
const authenticator = require('../middleware/auth-user');

router.post('/register-user', authValidator.userRegistration, authController.registerNonGoogleUser);

router.post('/login-user', authValidator.userLogin, authController.loginUser);

router.post('/request-password-reset', authValidator.requestResetPassword, authController.requestResetPassword);

router.get('/', authenticator, authController.authenticateUser)

module.exports = router;