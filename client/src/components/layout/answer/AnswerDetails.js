import React from 'react';
import {connect} from 'react-redux';

import AnswerCard from './AnswerCard';
import AnswerForm from './AnswerForm';
import Alert from '../Alert';

const ALERT_LOCATION = "ANSWER_DETAILS";

const AnswerDetails = ({answers, questionId, alertLocation}) => {
    return (
        <div className="row py-3">
            <div className="col-lg-12">
                {alertLocation === ALERT_LOCATION && <Alert />}
                <h3>{ answers.length } Answers</h3>
                <hr/>
                { answers.map(answer => (<AnswerCard questionId={questionId} ans={answer} key={answer._id} />)) }
                <h3>Post Your Answer</h3>
                <AnswerForm questionId={questionId} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    answers: state.ans.answerList,
    alertLocation: state.global.alertLocation
})

export default connect(mapStateToProps)(AnswerDetails);