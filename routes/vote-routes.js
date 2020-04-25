const router = require('express').Router();

const {questionUpVote, questionDownVote, questionVoter, answerVoter} = require('../controllers/vote-controller');
const authorizeUser = require('../middleware/auth-user');

router.get('/upvote/question/:question_id', authorizeUser, questionUpVote)

router.get('/downvote/question/:question_id', authorizeUser, questionDownVote)

router.get('/question/:question_id', authorizeUser, questionVoter);

router.get('/answer/:answer_id/:question_id', authorizeUser, answerVoter);

module.exports = router;