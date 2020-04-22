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