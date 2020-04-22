import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import QuestionItems from './QuestionItems';

const Questions = ({questions, isLoading}) => {
    
    return <Fragment>
        { questions.length > 0  ? (
                <Fragment>
                    { questions.map( question => <QuestionItems questionDetails={question} key={question._id} /> ) }
                </Fragment>
            ) : (
                <Fragment>
                <h4 className="text-center lead">No questions found for the searched term.</h4>
                <p className='text-center'>Please click <Link to='/ask-question'>here</Link> to ask this question</p>
            </Fragment>
        ) }
    </Fragment>
}

Questions.propTypes = {
    questions: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    questions: state.ques.questionsList,
    isLoading: state.ques.isLoading
});

export default connect(mapStateToProps)(Questions);