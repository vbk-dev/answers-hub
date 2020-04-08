const {check} = require('express-validator');

exports.questionValidator = [
    check('title', 'Title is required').not().isEmpty(),
    check('title', 'Title between 3 to 128 character').isLength({min: 3, max: 128}).trim(),
    check('body', 'Last Name is required').not().isEmpty().trim(),
    check('tags', 'Email is required').not().isEmpty().trim()
];