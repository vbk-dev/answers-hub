const router = require('express').Router();

const questionController = require('../controllers/question-controller');
const {questionValidator} = require('../validation/que-ans-validator');
const authorizeUser = require('../middleware/auth-user');

// router.get('/all', questionController.fetchAllQuestions);

router.get('/:question_id/:question_title', questionController.fetchQuestions);

router.post('/', authorizeUser, questionValidator, questionController.postQuestion);

router.put('/:question_id', authorizeUser, questionValidator, questionController.updateQuestion);

router.delete('/:question_id', authorizeUser, questionController.deleteQuestion);

router.post('/search', questionController.searchedQuestions);

module.exports = router;