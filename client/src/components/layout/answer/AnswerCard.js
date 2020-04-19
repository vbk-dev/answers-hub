import React, { Fragment, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';
import {connect} from 'react-redux';

import UserTag from '../user/UserTag';
import {deleteAnswer} from '../../../actions/answer';
import AnswerForm from './AnswerForm';
import Alert from '../Alert';

const AnswerCard = ({ans, userId, deleteAnswer, questionId, alertLocation}) => {
    const [isEditing, setIsEditing] = useState(false);
    const {answer, postedBy, postedOn} = ans;
    const ALERT_LOCATION = ans._id + '-ANSWER_CARD';

    
    return (
        <Fragment>
            <div className='answer-card'>
                {alertLocation === ALERT_LOCATION && <Alert />}
                { isEditing ? (
                    <Fragment>
                        <AnswerForm questionId={questionId} ansDetails={ans} type='EDIT' setIsEditing={setIsEditing} />
                    </Fragment>
                ) : (
                    <Fragment>
                        { userId === postedBy._id && 
                            (<p className='text-right'>
                                <input type="button" value="Edit" className='btn btn-dark mx-1 btn-sm'
                                    onClick={(event) => { setIsEditing(true) }} />
                                <input type="button" value="Delete" className='btn btn-danger mx-1 btn-sm'
                                    onClick={(event) => { deleteAnswer(ans._id, questionId, 'ANSWER_DETAILS'); }} />
                            </p>) }
                        <Fragment>
                            {ReactHtmlParser(answer)}
                        </Fragment>
                        <p>
                            <span className="text-muted">Answered at </span>{Moment(postedOn).format('Do MMM YYYY, h:mm A')}
                        </p>
                        <UserTag type='Answered' firstName={postedBy.firstName} lastName={postedBy.lastName} score={postedBy.score} />
                    </Fragment>
                ) }
            </div>
            <hr/>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    userId: state.auth.user ? state.auth.user._id : '',
    alertLocation: state.global.alertLocation
}); 

export default connect(mapStateToProps, {deleteAnswer})(AnswerCard);