const QuestionModel = require('../models/question-model');
const AnswerModel = require('../models/answer-model');

exports.questionUpVote = async (req, res, next) => {
    try {
        const question = await QuestionModel.findById(req.params.question_id).select('-__v').populate('postedBy', 'score firstName lastName id');
        
        if (question.votes.filter( id => id.toString() === req.user_id.toString()).length > 0){
            res.status(401).json({ error: 'Already voted up!' });
        } else {
            question.votes.unshift(req.user_id)
            await question.save();
            res.json({question});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.questionDownVote = async (req, res, next) => {
    try {
        const question = await QuestionModel.findById(req.params.question_id).select('-__v').populate('postedBy', 'score firstName lastName id');
        const newVotesArray = question.votes.filter( id => id.toString() !== req.user_id.toString());

        if (newVotesArray.length !== question.votes.length){
            question.votes = newVotesArray;
            await question.save();
            res.json({question});
        } else {
            res.status(401).json({ error: 'Question not voted! can not unvote question' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.answerUpVote = async (req, res, next) => {
    try {
        const answer = await AnswerModel.findById(req.params.answer_id).select('postedBy votes question_id');
        
        if (answer.votes.filter( id => id.toString() === req.user_id.toString()).length > 0){
            res.status(401).json({ error: 'Answer already voted up!' });
        } else {
            answer.votes.unshift(req.user_id)
            await answer.save();
            res.json({answers: fetchAnswersList(answer.question_id)});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.answerDownVote = async (req, res, next) => {
    try {
        const answer = await AnswerModel.findById(req.params.answer_id).select('postedBy votes question_id');
        const newVotesArray = answer.votes.filter( id => id.toString() !== req.user_id.toString());

        if (newVotesArray.length !== answer.votes.length){
            answer.votes = newVotesArray;
            await answer.save();
            res.json({answers: fetchAnswersList(answer.question_id)});
        } else {
            res.status(401).json({ error: 'Answer not voted! can not unvote question' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

exports.answerVoter = async (req, res, next) => {
    try {
        const answer = await AnswerModel.findById(req.params.answer_id).select('postedBy votes');
        if (answer.postedBy.toString() === req.user_id.toString()) return res.json({ error: 'Can not vote your own answer' })
        const votesArray = answer.votes;
        
        const vote = votesArray.filter( voter => voter.toString() !== req.user_id.toString())
        
        if (vote.length === votesArray.length) {
            votesArray.unshift(req.user_id);
            answer.votes = votesArray;
            await answer.save();
        } else {
            answer.votes = vote;
            await answer.save();
        }
        res.json({msg: 'done'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Something went wrong'});
    }
}

const fetchAnswersList = async question_id => {
    return await AnswerModel.find({ question_id }).select('-question_id -__v').sort({postedOn: -1})
        .populate([{
            path: 'comments',
            populate: {
                path: "postedBy",
                select: 'firstName score lastName'
              }
        },
            {
            path: 'postedBy', 
            select: 'firstName score lastName'
        }]);
}