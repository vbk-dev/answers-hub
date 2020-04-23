import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';

import Spinner from '../Spinner';
import UserTag from '../user/UserTag';
import { Link, withRouter } from 'react-router-dom';
import {generateTagArray} from '../../../utils/formatter';
import TagItem from './TagItem';
import {deleteQuestion} from '../../../actions/question';

const QuestionDetails = ({question, isLoading, userId, dashTitle, id, history, deleteQuestion}) => {

    return (
        <Fragment>
            {isLoading ? (
                <div className="text-center py-5">
                    <Spinner />
                </div>
                ) : 
                (<div className="row">
                    <div className="col-lg-12 mt-4 mb-2 question-container">
                        <div className="vote">
                            <div className="vote-container">
                            <h4><strong>Votes</strong></h4>
                                <strong className="display-4">
                                    {question.votes.length}
                                </strong>
                                <div>
                                    { false ? (
                                        <Fragment>
                                        <i className="far vote-icon fa-arrow-alt-circle-up" onClick={ event => { console.log('working') } }></i>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                        <i className="fas vote-icon fa-arrow-circle-up"></i>
                                        </Fragment>
                                    ) }
                                </div>
                            </div>
                        </div>
                        <div className="question-details">
                        { userId === question.postedBy._id && (<p className='text-right'>
                            <Link to={`/edit-question/${id}/${dashTitle}`} className='btn btn-dark mx-2'>Edit Question</Link>
                            <input type="button" value="Delete Question" onClick={(event) => { 
                                deleteQuestion(question._id, 'QUESTION_DISPLAY', history); }} className='btn btn-danger mx-2' />
                        </p>) }
                        <h2 className='text-justify'>{question.title}</h2>
                        <span className="text-muted">Asked at </span>{Moment(question.postedOn).format('Do MMM YYYY, h:mm A')}
                        <hr/>
                        <div className="ques-desc">
                            {ReactHtmlParser(question.description)}
                        </div>
                        <hr/>
                        <strong className='my-2'>Tags: </strong>{generateTagArray(question.tags).map((tagItem, ind) => <TagItem tag={tagItem} key={ind} /> )}
                        <UserTag type='Asked' firstName={question.postedBy.firstName} lastName={question.postedBy.lastName} 
                            score={question.postedBy.score} />
                        </div>
                    </div>
                </div>) 
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

export default connect(mapStateToProps, {deleteQuestion})(withRouter(QuestionDetails));
