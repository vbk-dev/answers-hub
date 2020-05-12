import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';

import QuestionForm from '../../../layout/question/QuestionForm';
import {fetchQuestionDetails} from '../../../../actions/question';

const EditQuestion = ({isLoading, fetchQuestionDetails, match}) => {
    useEffect(()=>{
        fetchQuestionDetails(match.params.id, match.params.title);
        // eslint-disable-next-line
    },[])

    return (
        <Fragment>
            {!isLoading && <QuestionForm type='EDIT' dashedTitle={match.params.title} />}
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isLoading: state.ques.isLoading
});

export default connect(mapStateToProps, {fetchQuestionDetails})(EditQuestion);