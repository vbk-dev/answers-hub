const {validationResult} = require('express-validator');

const AnswerModel = require('../models/answer-model');

exports.postAnswer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    let answer = new AnswerModel({
        answer: req.body.answer,
        question_id: req.params.question_id,
        postedBy: req.user_id 
    });
    answer = await answer.save();

    const answers = await AnswerModel.find({ question_id: req.params.question_id }).sort({postedOn: -1}).populate('postedBy', 'firstName score lastName');
    
    res.json({
        answers
    });
}

exports.deleteAnswer = async (req, res, next) => {
    try {
        const answerId = req.params.answer_id;
        const answer = await AnswerModel.findById(answerId).select('postedBy');
        if (!answer) return res.status(404).json({error: 'Answer not found'});
        if (answer.postedBy.toString() !== req.user_id.toString()) return res.status(401).json({error: 'User not authorized'});

        await AnswerModel.findByIdAndRemove(answerId);

        res.json({result: 'Answer deleted'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.fetchAnswers = async (req, res, next) => {
    try {
        const answers = await AnswerModel.find({question_id: req.params.question_id}).select('-question_id -__v')
            .sort({postedOn: -1}).populate('postedBy', 'firstName score lastName');
        res.json({answers});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.updateAnswer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    try {
        const answer = await AnswerModel.findById(req.params.answer_id);
        if (!answer) return res.status(404).json({error: 'Answer not found'});
        if (answer.postedBy.toString() !== req.user_id.toString()) return res.status(401).json({error: 'User not authorized'});

        answer.answer = req.body.answer;
        await answer.save();

        const answers = await AnswerModel.find({ question_id: req.params.question_id }).sort({postedOn: -1}).populate('postedBy', 'firstName lastName -_id');

        res.json({answers});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Something went wrong'});
    }
}