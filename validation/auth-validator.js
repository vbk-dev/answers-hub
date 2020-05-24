const {check} = require('express-validator');

exports.registrationValidation = [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('firstName', 'First Name between 2 to 32 character').isLength({min: 2, max: 32}).trim(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('lastName', 'Last Name between 2 to 32 character').isLength({min: 2, max: 32}).trim(),
    check('email', 'Email is required').isEmail(),
    check('email', 'Email between 2 to 32 character').isLength({min: 5, max: 128}).normalizeEmail(),
    check('password', "Password between 6 to 32 character").isLength({ min: 6, max: 32}),
    check('password', 'Password did not match').custom((value , {req, loc, path}) => {
        if (value !== req.body.confirmPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
];

exports.loginValidation = [
    check('email', 'Email is required').isEmail().normalizeEmail(),
    check('password', 'Password is required').not().isEmpty()
];

exports.resetRequestValidation = [
    check('email', 'Email is required').isEmail().normalizeEmail()
];

exports.resetPasswordValidation = [
    check('password', "Password between 6 to 32 character").isLength({ min: 6, max: 32}),
    check('password', 'Password did not match').custom((value , {req, loc, path}) => {
        if (value !== req.body.confirmPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
]