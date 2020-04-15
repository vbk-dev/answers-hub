import React from 'react';
// import PropTypes from 'prop-types';
import Moment from 'moment';
import {Link} from 'react-router-dom';

const QuestionItems = ({ questionDetails }) => {
    
    return (
        <div className="card my-2">
            <div className="card-body">
                <h4><Link to={`/question/${questionDetails._id}/${questionDetails.dashedTitle}`}>{questionDetails.title}</Link></h4>
                <p>
                    Asked On: {Moment(questionDetails.postedOn).format('Do MMM YYYY')} 
                </p>
            </div>
        </div>
    );
}

// QuestionItems.propTypes = {
    
// };

export default QuestionItems;