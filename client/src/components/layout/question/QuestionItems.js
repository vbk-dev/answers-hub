import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {Link} from 'react-router-dom';

import {generateTagArray} from '../../../utils/formatter';
import TagItem from './TagItem';

const QuestionItems = ({ questionDetails }) => {

    const { _id, title, dashedTitle, postedOn, tags, votes, postedBy, answers } = questionDetails;
    
    return (
        <div className="question-card-container">
            <div className='ques-left'>
                <div className="que-vote">
                    <h5>Votes</h5>
                    <h3>{votes}</h3>
                </div>
                <div className="que-ans">
                    <h5>Answer</h5>
                    <h3>{answers}</h3>
                </div>
            </div>
            <div className='ques-right'>
                <h4><Link to={`/question/${_id}/${dashedTitle}`}>{title}</Link></h4>
                <p>{generateTagArray(tags).map((tagItem, ind) => <TagItem tag={tagItem} key={ind} /> )}</p>
                <p>Asked by {postedBy} at {Moment(postedOn).format('Do MMM YYYY, h:mm A')}</p>
            </div>
        </div>
    );
}

QuestionItems.propTypes = {
    questionDetails: PropTypes.object.isRequired  
};

export default QuestionItems;