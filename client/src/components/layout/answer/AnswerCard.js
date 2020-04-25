import React, { Fragment, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import UserTag from '../user/UserTag';
import Alert from '../Alert';
import Voter from '../Voter';
import {deleteAnswer, upVote, downVote} from '../../../actions/answer';
import AnswerForm from './AnswerForm';

const AnswerCard = ({ans, userId, deleteAnswer, questionId, alertLocation, upVote, downVote}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isVoteError, setIsVoteError] = useState(false);
    const {answer, postedBy, postedOn, votes, _id} = ans;
    const ALERT_LOCATION = ans._id + '-ANSWER_CARD';

    const upVoteHandler = event => {
        if (userId !== '' && userId !== null){
            upVote(_id, ALERT_LOCATION);
        } else {
            setIsVoteError(true);
        }
    }

    const downVoteHandler = event => {
        if (userId !== '' && userId !== null){
            downVote(_id, ALERT_LOCATION);
        } else {
            setIsVoteError(true);
        }
    }

    return (
        <Fragment>
            <div className='answer-card'>
                {alertLocation === ALERT_LOCATION && <Alert />}
                { isEditing ? (
                    <Fragment>
                        <AnswerForm questionId={questionId} ansDetails={ans} type='EDIT' setIsEditing={setIsEditing} />
                    </Fragment>
                ) : (
                    <div className="flex-container">
                        <Voter votes={votes.length} upVoteHandler={upVoteHandler} downVoteHandler={downVoteHandler} />
                        <div>
                            { userId === postedBy._id && 
                                (<p className='text-right'>
                                    <input type="button" value="Edit" className='btn btn-dark mx-1 btn-sm'
                                        onClick={(event) => { setIsEditing(true) }} />
                                    <input type="button" value="Delete" className='btn btn-danger mx-1 btn-sm'
                                        onClick={(event) => { deleteAnswer(ans._id, questionId, 'ANSWER_DETAILS'); }} />
                                </p>
                            ) }
                            <Fragment>
                                {ReactHtmlParser(answer)}
                            </Fragment>
                            <p><span className="text-muted">Answered at </span>{Moment(postedOn).format('Do MMM YYYY, h:mm A')}</p>
                            <UserTag type='Answered' firstName={postedBy.firstName} lastName={postedBy.lastName} score={postedBy.score} />
                            { isVoteError && (
                                <div className="text-center col-lg-12 py-3 bg-danger text-light mb-2 error-box">
                                    <h5>Please <Link className='danger-link' to='/login'>Login</Link> or <Link className='danger-link' to='/register'>Register</Link> to vote question.</h5>
                                </div>
                            ) }
                        </div>
                    </div>
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

export default connect(mapStateToProps, {deleteAnswer, upVote, downVote})(AnswerCard);