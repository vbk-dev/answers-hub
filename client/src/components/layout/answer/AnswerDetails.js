import React from 'react';
import {connect} from 'react-redux';

import AnswerCard from './AnswerCard';
import AnswerForm from './AnswerForm';

const AnswerDetails = ({answers, questionId}) => {
    return (
        <div className="row py-3">
            <div className="col-lg-12">
                <h3>{ answers.length } Answers</h3>
                <hr/>
                { answers.map( answer => ( <AnswerCard ans={answer} key={answer._id} /> ) ) }
                <h3>Post Your Answer</h3>
                <AnswerForm questionId={questionId} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    answers: state.ans.answerList
})

export default connect(mapStateToProps)(AnswerDetails);