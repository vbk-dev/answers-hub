import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';

import Spinner from '../Spinner';
import UserTag from '../user/UserTag';
import { Link, withRouter } from 'react-router-dom';
import { generateTagArray } from '../../../utils/formatter';
import TagItem from './TagItem';
import { deleteQuestion, upVote, downVote } from '../../../actions/question';

const QuestionDetails = ({ question, isLoading, userId, dashTitle, id, history, deleteQuestion, upVote, downVote }) => {
    const [isVoteError, setIsVoteError] = useState(false);
    
    const upVoteHandler = event => {
        if (userId !== '' && userId !== null){
            upVote(question._id, 'QUESTION_DISPLAY');
        } else {
            setIsVoteError(true);
        }
    }

    const downVoteHandler = event => {
        if (userId !== '' && userId !== null){
            downVote(question._id, 'QUESTION_DISPLAY');
        } else {
            setIsVoteError(true);
        }
    }

    return ( 
        <Fragment> 
            { isLoading ? 
                ( <div className = "text-center py-5"><Spinner /></div>
                ) : ( 
                    <div className="row">
                        <div className="col-lg-12 mt-4 mb-2 question-container">
                            <div className="vote">
                                <div className="vote-container">
                                    <i className="fas fa-thumbs-up voting-icon text-success" onClick={upVoteHandler}></i>
                                    <h4><strong>Votes</strong></h4 >
                                    <h1 className="display-4" ><strong>{question.votes.length}</strong></h1>
                                    <i className="fas fa-thumbs-down voting-icon text-danger" onClick={downVoteHandler} ></i>
                                </div>
                            </div>
                            <div className="question-details">
                                {userId === question.postedBy._id && ( 
                                    <p className='text-right'>
                                        <Link to = {`/edit-question/${id}/${dashTitle}`} className = 'btn btn-dark mx-2'>Edit Question</Link>
                                        <input type = "button" value = "Delete Question" onClick = { (event) => {
                                            deleteQuestion(question._id, 'QUESTION_DISPLAY', history); } } className = 'btn btn-danger mx-2' / >
                                    </p>
                                ) } 
                                <h2 className='text-justify'> {question.title}</h2> 
                                <span className = "text-muted">Asked at </span>{Moment(question.postedOn).format('Do MMM YYYY, h:mm A')} 
                                <hr />
                                <div className="ques-desc"> { ReactHtmlParser(question.description) } </div> 
                                <hr />
                                <strong className = 'my-2' > Tags: </strong>
                                { generateTagArray(question.tags).map((tagItem, ind) => <TagItem tag={tagItem} key={ind} / > )} 
                                <UserTag type = 'Asked' firstName={ question.postedBy.firstName } lastName = { question.postedBy.lastName } 
                                    score = { question.postedBy.score } />
                            </div>
                        </div>
                        { isVoteError && (
                            <div className="text-center col-lg-12 py-3 bg-danger text-light mb-2 error-box">
                                <h5>Please <Link className='danger-link' to='/login'>Login</Link> or <Link className='danger-link' to='/register'>Register</Link> to vote question.</h5>
                            </div>
                        ) }
                    </div>
                )
            }
        </Fragment>
    );
}

QuestionDetails.propTypes = {
    question: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    userId: PropTypes.string
}

const mapStateToProps = state => ({
    question: state.ques.question,
    isLoading: state.ques.isLoading,
    userId: state.auth.user ? state.auth.user._id : ''
});

export default connect(mapStateToProps, { deleteQuestion, upVote, downVote })(withRouter(QuestionDetails));