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

exports.questionVoter = async (req, res, next) => {
    try {
        const question = await QuestionModel.findById(req.params.question_id).select('postedBy votes');
        if (question.postedBy.toString() === req.user_id.toString()) return res.json({ error: 'Can not vote your own question' })
        const votesArray = question.votes;
        
        const vote = votesArray.filter( voter => voter.toString() !== req.user_id.toString())
        
        if (vote.length === votesArray.length) {
            votesArray.unshift(req.user_id);
            question.votes = votesArray;
            await question.save();
        } else {
            question.votes = vote;
            await question.save();
        }
        res.json(question);
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