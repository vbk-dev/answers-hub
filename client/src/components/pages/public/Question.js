import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import QuestionDetails from '../../layout/question/QuestionDetails';
import {fetchQuestionDetails} from '../../../actions/question';
import Alert from '../../layout/Alert';

const ALERT_LOCATION = 'QUESTION_DISPLAY';

const Question = ({fetchQuestionDetails, match, alertLocation}) => {

    useEffect(() => {
        fetchQuestionDetails(match.params.id, match.params.title);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container ques-container my-4 px-5">
            {alertLocation === ALERT_LOCATION && <Alert />}
            <div className="question">
                <QuestionDetails dashTitle={match.params.title} id={match.params.id} />
            </div>
        </div>
    );
}

Question.propTypes = {
    fetchQuestionDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation
});

export default connect(mapStateToProps, { fetchQuestionDetails })(Question);
