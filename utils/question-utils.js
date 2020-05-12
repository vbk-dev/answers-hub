const lodash = require('lodash');
const AnswerModel = require('../models/answer-model');

exports.formatTags = str => {
    let tag = '';
    if (str.trim() === '' || str === null)
        return null;
    const arr = str.split(',');
    for (let item of arr){
        tag += (item.trim() + ' , ')
    }
    tag = tag.slice(0, tag.length-2);
    return tag;
}

exports.questionObjectFormatter = questionsList => {
    const result = []
    if (questionsList === null || questionsList.length < 1){
        return null;
    }
    questionsList.map(async question => {
        result.push({
            _id: question._id,
            title: question.title,
            dashedTitle: lodash.kebabCase(question.title),
            postedOn: question.postedOn,
            tags: question.tags,
            votes: question.votes.length,
            postedBy: question.postedBy.firstName + ' ' + question.postedBy.lastName,
        });
    });
    return result
}

exports.formatSearchedQuetions = (questionList, res) => {
    const result = [];
    if (questionList === null || questionList.length < 1) return res.json({questions: null});
    try {
        questionList.map(async question => {
            const answers = await AnswerModel.find({question_id: question._id}).countDocuments();
            result.push({
                _id: question._id,
                title: question.title,
                dashedTitle: lodash.kebabCase(question.title),
                postedOn: question.postedOn,
                tags: question.tags,
                votes: question.votes.length,
                postedBy: question.postedBy.firstName + ' ' + question.postedBy.lastName,
                answers: answers
            });
            if (questionList.length === result.length) return res.json({questions: result}); 
        });
    } catch (error) {
        throw error;
    }
}