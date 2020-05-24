const router = require('express').Router();

const {registration, login, requestResetPassword, verigyResetLink, resetPassword, 
            authenticateUser} = require('../controllers/auth-controller');
const {registrationValidation, loginValidation, resetRequestValidation, 
            resetPasswordValidation} = require('../validation/auth-validator');
const {ValidationsResult} = require('../validation');
const authenticator = require('../middleware/auth-user');

router.post('/register-user', registrationValidation, ValidationsResult, registration);

router.post('/login-user', loginValidation, ValidationsResult, login);

router.post('/request-password-reset', resetRequestValidation, ValidationsResult, requestResetPassword);

router.post('/verify-reset-link', verigyResetLink);

router.post('/reset-password', resetPasswordValidation, ValidationsResult, resetPassword);

router.get('/', authenticator, authenticateUser)

module.exports = router;