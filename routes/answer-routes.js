const router = require('express').Router();

const answerController = require('../controllers/answer-controller');
const {answerValidator, commentValidator} = require('../validation/que-ans-validator');
const authenticator = require('../middleware/auth-user');

router.post('/post-answer/:question_id', authenticator, answerValidator, answerController.postAnswer);

router.delete('/:answer_id/:question_id', authenticator, answerController.deleteAnswer)

router.get('/fetch/:question_id', answerController.fetchAnswers)

router.put('/:question_id/:answer_id', authenticator, answerValidator, answerController.updateAnswer)

router.post('/post-comment/:answer_id', authenticator, commentValidator, answerController.postComment);

module.exports = router;
