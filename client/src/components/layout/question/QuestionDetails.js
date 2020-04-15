import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';

import Spinner from '../Spinner';
import UserTag from '../user/UserTag';
import { Link } from 'react-router-dom';

const QuestionDetails = ({question, isLoading, userId}) => {
    return (
        <Fragment>
            {isLoading ? (<Spinner />) : 
                (<div className="row">
                    <div className="col-lg-12 mt-4">
                    { userId === question.postedBy._id && (<p className='text-right'>
                            <Link to='/' className='btn btn-dark'>Edit Question</Link>
                        </p>) }
                        <h2 className='text-justify'>{question.title}</h2>
                        <span className="text-muted">Asked at </span>{Moment(question.postedOn).format('Do MMM YYYY, h:mm A')}
                        <hr/>
                        <div className="ques-desc">
                            {ReactHtmlParser(question.description)}
                        </div>
                        <hr/>
                        <strong>Tags: </strong>{question.tags}
                        <UserTag firstName={question.postedBy.firstName} lastName={question.postedBy.lastName} 
                            score={question.postedBy.score} />
                    </div>
                </div>) 
            }
        </Fragment>
    )
}

// votes: [],
//       isAnswered: false,
//       _id: '5e950742e4bca256a83bc94d',
//       title: 'This is a question asked from front end',
//       description: '<p>is my react front end working bro?</p><h2>Tell na bro</h2>',
//       tags: 'react  react js  js',
//       postedOn: '2020-04-14T00:43:46.633Z',
//       postedBy: {
//         score: 0,
//         _id: '5e9285669bdcb146c411cef2',
//         firstName: 'Vaibhav',
//         lastName: 'Kumar'
//       }

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
