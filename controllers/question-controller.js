const {validationResult} = require('express-validator');
const lodash = require('lodash');

const QuestionModel = require('../models/question-model');
const {formatTags, questionObjectFormatter} = require('../utils/question-utils');

exports.postQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }
    try {
        let question = new QuestionModel(req.body);
        question.tags = formatTags(req.body.tags);
        question.postedBy = req.user_id;
        await question.save();

        res.json({result: true});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.updateQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {
        const question = await QuestionModel.findById(req.params.question_id);
        if (!question) return res.status(404).json({error: 'Question not found'});
        if (question.postedBy.toString() !== req.user_id.toString()) return res.status(401).json({error: 'User not authorized'});

        const {title, description, tags} = req.body;
        question.title = title;
        question.description = description;
        question.tags = formatTags(tags);

        await question.save();

        res.json({question});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.deleteQuestion = async (req, res, next) => {
    try {
        const questionID = req.params.question_id;
        const question = await QuestionModel.findById(questionID).select('postedBy');
        if (!question) return res.status(404).json({error: 'Question not found'});
        if (question.postedBy.toString() !== req.user_id.toString()) return res.status(401).json({error: 'User not authorized'});

        await QuestionModel.findByIdAndRemove(questionID);

        res.json({result: 'Question deleted'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

// exports.fetchAllQuestions = async (req, res, next) => {
//     try {
//         const questions = await QuestionModel.find().sort({postedOn: -1}).populate('postedBy', 'firstName lastName -_id');
//         const result = await questionObjectFormatter(questions);
//         res.json({questions: result});
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({error: 'Something went wrong'});
//     }
// }

exports.fetchQuestions = async (req, res, next) => {
    try {
        const question = await QuestionModel.findById(req.params.question_id).select('-__v').populate('postedBy', 'score firstName lastName id');
        if (question && req.params.question_title === lodash.kebabCase(question.title)){
            res.json({question});
        } else {
            res.status(200).json({error: 'Question not found'});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.searchedQuestions = async (req, res, next) => {
    let query = req.body.query;
    let questions;
    try {
        if (!query){
            questions = await QuestionModel.find().sort({postedOn: -1}).populate('postedBy', 'firstName lastName -_id');
        } else {
            questions = await QuestionModel.find({ $text: { $search: query } }).sort({postedOn: -1}).populate('postedBy', 'firstName lastName -_id');
        }
        const result = await questionObjectFormatter(questions);
        res.json({questions: result});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}