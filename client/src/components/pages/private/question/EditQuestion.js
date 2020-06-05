import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';

import {fetchQuestionDetails} from '../../../../actions/question';
import QuestionForm from '../../../layout/question/QuestionForm';
import Spinner from '../../../layout/Spinner';

const EditQuestion = ({match, fetchQuestionDetails, isLoading}) => {
    useEffect(() => {
        fetchQuestionDetails(match.params.id, match.params.title);
        console.log('I am inside the edit question');
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            { isLoading ? (
                 <div className = "text-center py-5"><Spinner /></div>
             ) : (
                <QuestionForm type='EDIT' dashedTitle={match.params.title} />
             ) }
        </Fragment>
    )
}


const mapStateToProps = state => ({
    isLoading: state.ques.isLoading
});


export default connect(mapStateToProps, {fetchQuestionDetails})(EditQuestion);