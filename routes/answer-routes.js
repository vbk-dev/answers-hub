const router = require('express').Router();

const answerController = require('../controllers/answer-controller');
const {answerValidator} = require('../validation/que-ans-validator');
const authenticator = require('../middleware/auth-user');

router.post('/post-answer/:question_id', authenticator, answerValidator, answerController.postAnswer);

router.delete('/:answer_id', authenticator, answerController.deleteAnswer)

router.get('/fetch/:question_id', answerController.fetchAnswers)

router.put('/:question_id/:answer_id', authenticator, answerValidator, answerController.updateAnswer)

module.exports = router;