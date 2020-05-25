const {validationResult} = require('express-validator');
const lodash = require('lodash');

const QuestionModel = require('../models/question-model');
const UserModel = require('../models/user-model');
const {formatTags, formatSearchedQuetions} = require('../utils/question-utils');

const NO_QUESTION_PER_PAGE = 10;

exports.postQuestion = async (req, res, next) => {
    try {
        let question = new QuestionModel(req.body);
        question.tags = formatTags(req.body.tags);
        question.postedBy = req.user_id;
        await question.save();

        await UserModel.updateOne({ _id: req.user_id }, { $inc: { score: 5 } });

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

        await UserModel.updateOne({ _id: req.user_id }, { $inc: { score: -5 } });

        res.json({result: 'Question deleted'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

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
    const {query, page} = req.body; 
    let questions;
    try {
        if (!query){
            questions = await QuestionModel.find().skip((page-1) * NO_QUESTION_PER_PAGE).limit(NO_QUESTION_PER_PAGE)
                .sort({postedOn: -1}).select('-__v -description').populate('postedBy', 'firstName lastName -_id');
        } else {
            questions = await QuestionModel.find({ $text: { $search: query } }).skip(page-1).limit(NO_QUESTION_PER_PAGE)
                .sort({postedOn: -1}).select('-__v -description').populate('postedBy', 'firstName lastName -_id');
        }
        await formatSearchedQuetions(questions, res);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}