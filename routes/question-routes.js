const router = require('express').Router();

const questionController = require('../controllers/question-controller');
const questionValidation = require('../validation/que-ans-validator');
const authorizeUser = require('../middleware/auth-user');

router.get('/all', questionController.fetchAllQuestions);

router.get('/:question_id/:question_title', questionController.fetchQuestions);

router.post('/', authorizeUser, questionValidation.questionValidator, questionController.postQuestion);

router.put('/:question_id', authorizeUser, questionValidation.questionValidator, questionController.updateQuestion);

router.delete('/:question_id', authorizeUser, questionController.deleteQuestion);

module.exports = router;