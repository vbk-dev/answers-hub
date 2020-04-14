const {check} = require('express-validator');

exports.questionValidator = [
    check('title', 'Title is required').not().isEmpty(),
    check('title', 'Title between 3 to 128 character').isLength({min: 3, max: 128}).trim(),
    check('description', 'Description is required').not().isEmpty().trim(),
    check('tags', 'Tags must be less than 128 character').isLength({max: 128}).trim()
];