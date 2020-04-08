const {validationResult} = require('express-validator');

const QuestionModel = require('../models/question-model');

exports.postQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {
        let question = new QuestionModel(req.body);
        question.tags = req.body.tags.replace(/,/g, ' ');
        question.postedBy = req.user_id;
        await question.save();

        res.json({question});
    } catch (error) {
        console.error(error);
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
        
        const {title, body, tags} = req.body;
        question.title = title;
        question.body = body;
        question.tags = tags.replace(/,/g, ' ');

        await question.save();

        res.json({question});
    } catch (error) {
        console.error(error);
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
        console.error(error);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.fetchAllQuestions = async (req, res, next) => {
    try {
        const questions = await QuestionModel.find().select('title postedOn').sort({postedOn: -1});
        res.json({questions});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.fetchQuestions = async (req, res, next) => {
    try {
        const question = await QuestionModel.findById(req.params.question_id).populate('postedBy');
        res.json({question});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Something went wrong'});
    }
}