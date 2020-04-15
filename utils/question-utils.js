const lodash = require('lodash');

exports.formatTags = str => {
    tag = '';
    if (str.trim() === '' || str === null)
        return null;
    const arr = str.split(',');
    for (let item of arr){
        tag += (item.trim() + ' ')
    }
    return tag.trim();
}

exports.questionObjectFormatter = questionsList => {
    const result = []
    if (questionsList === null || questionsList.length < 1){
        return null;
    }
    questionsList.map(question => {
        result.push({
            _id: question._id,
            title: question.title,
            dashedTitle: lodash.kebabCase(question.title),
            postedOn: question.postedOn,
            tags: question.tags,
            postedBy: question.postedBy.firstName + ' ' + question.postedBy.lastName
        });
    });
    return result
}