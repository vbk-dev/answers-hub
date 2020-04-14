import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import QuestionItem from './QuestionItems';
import {fetchAllQuestions} from '../../../actions/question';
import QuestionItems from './QuestionItems';

const Questions = ({questions, fetchAllQuestions}) => {

    useEffect(() => {
        fetchAllQuestions();
    }, [])
    
    return <Fragment>
        { questions.map( question => <QuestionItems questionDetails={question} key={question._id} /> ) }
    </Fragment>
}

Questions.propTypes = {
    questions: PropTypes.array.isRequired,
    fetchAllQuestions: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    questions: state.ques.questionsList
})

export default connect(mapStateToProps, {fetchAllQuestions})(Questions);