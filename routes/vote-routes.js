const router = require('express').Router();

const {questionUpVote, questionDownVote, answerUpVote, answerDownVote} = require('../controllers/vote-controller');
const authorizeUser = require('../middleware/auth-user');

router.get('/upvote/question/:question_id', authorizeUser, questionUpVote)

router.get('/downvote/question/:question_id', authorizeUser, questionDownVote)

router.get('/upvote/answer/:answer_id', authorizeUser, answerUpVote)

router.get('/downvote/answer/:answer_id', authorizeUser, answerDownVote)

module.exports = router;