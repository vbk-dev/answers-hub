const router = require('express').Router();

const {questionVoter, answerVoter} = require('../controllers/vote-controller');
const authorizeUser = require('../middleware/auth-user');

router.get('/question/:question_id', authorizeUser, questionVoter);

router.get('/answer/:answer_id/:question_id', authorizeUser, answerVoter);

module.exports = router;