const router = require('express').Router();

const authController = require('../controllers/auth-controller');
const authValidator = require('../validation/auth-validator');

router.post('/register-user', authValidator.userRegistration, authController.registerNonGoogleUser);

router.post('/login-user', authValidator.userLogin, authController.loginUser);

router.post('/request-password-reset', authValidator.requestResetPassword, authController.requestResetPassword);

module.exports = router;