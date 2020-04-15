import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import QuestionDetails from '../../layout/question/QuestionDetails';
import {fetchQuestionDetails} from '../../../actions/question';

const Question = ({fetchQuestionDetails, match}) => {

    useEffect(() => {
        fetchQuestionDetails(match.params.id, match.params.title);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container ques-container mt-4 px-5">
            <div className="question">
                <QuestionDetails />
            </div>
        </div>
    );
}

Question.propTypes = {
    fetchQuestionDetails: PropTypes.func.isRequired
};

export default connect(null, { fetchQuestionDetails })(Question);
