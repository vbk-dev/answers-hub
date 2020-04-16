import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';

import Spinner from '../Spinner';
import UserTag from '../user/UserTag';
import { Link } from 'react-router-dom';
import {generateTagArray} from '../../../utils/formatter';
import TagItem from './TagItem';

const QuestionDetails = ({question, isLoading, userId, dashTitle, id}) => {
    return (
        <Fragment>
            {isLoading ? (<Spinner />) : 
                (<div className="row">
                    <div className="col-lg-12 mt-4">
                    { userId === question.postedBy._id && (<p className='text-right'>
                            <Link to={`/edit-question/${id}/${dashTitle}`} className='btn btn-dark'>Edit Question</Link>
                        </p>) }
                        <h2 className='text-justify'>{question.title}</h2>
                        <span className="text-muted">Asked at </span>{Moment(question.postedOn).format('Do MMM YYYY, h:mm A')}
                        <hr/>
                        <div className="ques-desc">
                            {ReactHtmlParser(question.description)}
                        </div>
                        <hr/>
                        <strong>Tags: </strong>{generateTagArray(question.tags).map((tagItem, ind) => <TagItem tag={tagItem} key={ind} /> )}
                        <UserTag firstName={question.postedBy.firstName} lastName={question.postedBy.lastName} 
                            score={question.postedBy.score} />
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

export default connect(mapStateToProps)(QuestionDetails);
