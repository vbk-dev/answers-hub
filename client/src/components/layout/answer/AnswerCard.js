import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import UserTag from '../user/UserTag';

const AnswerCard = ({ans, userId}) => {
    const {answer, postedBy, postedOn} = ans;
    
    return (
        <Fragment>
            <div className='answer-card'>
                { userId === postedBy._id && (<p className='text-right'>
                            <Link to={`/`} className='btn btn-dark mx-2 btn-sm'>Edit Question</Link>
                            <input type="button" value="Delete Question" className='btn btn-danger mx-2 btn-sm' />
                        </p>) }
                <Fragment>
                    {ReactHtmlParser(answer)}
                </Fragment>
                <p>
                <span className="text-muted">Answered at </span>{Moment(postedOn).format('Do MMM YYYY, h:mm A')}
                </p>
                <UserTag type='Answered' firstName={postedBy.firstName} lastName={postedBy.lastName} score={postedBy.score} />
            </div>
            <hr/>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    userId: state.auth.user ? state.auth.user._id : ''
});

// onClick={(event) => { 
//     deleteQuestion(question._id, 'QUESTION_DISPLAY', history); }} 

export default connect(mapStateToProps)(AnswerCard);