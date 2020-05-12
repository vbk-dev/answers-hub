import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import QuestionDetails from '../../layout/question/QuestionDetails';
import AnswerDetails from '../../layout/answer/AnswerDetails';
import {fetchQuestionDetails} from '../../../actions/question';
import {fetchAllAnswers} from '../../../actions/answer';
import Alert from '../../layout/Alert';
import SearchBar from '../../layout/SearchBar';

const ALERT_LOCATION = 'QUESTION_DISPLAY';

const Question = ({fetchQuestionDetails, match, alertLocation, fetchAllAnswers}) => {

    useEffect(() => {
        fetchQuestionDetails(match.params.id, match.params.title);
        fetchAllAnswers(match.params.id, ALERT_LOCATION);
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div className="my-3">
                <SearchBar />
            </div>
            <div className="container cus-card-container mb-1 px-5">
                {alertLocation === ALERT_LOCATION && <Alert />}
                <QuestionDetails dashTitle={match.params.title} id={match.params.id} />
            </div>
            <div className="container cus-card-container mt-2 mb-4 px-5">
                <AnswerDetails questionId={match.params.id} />
            </div>
        </Fragment>
    );
}

Question.propTypes = {
    fetchQuestionDetails: PropTypes.func.isRequired,
    alertLocation: PropTypes.string,
    match: PropTypes.object.isRequired,
    fetchAllAnswers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation
});

export default connect(mapStateToProps, { fetchQuestionDetails, fetchAllAnswers })(Question);
