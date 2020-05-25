import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import SmallSpinner from '../SmallSpinner';

import {loadQuestions} from '../../../actions/question';

const QuestionLoader = ({search, globalLoading, page, loadQuestions, isMoreQuestions}) => {
    return (
        <div className="text-center">
            { isMoreQuestions ? (
                <Fragment>
                {!globalLoading ? (
                    <Fragment>
                        <input type="button" value="Load more questions..." className='btn btn-sm btn-info' onClick={ () => { loadQuestions(search, page); } } />
                    </Fragment>) : (<Fragment>
                        <button className='btn btn-info btn-sm px-4' disabled>
                            <SmallSpinner />{` `}
                            Loading more questions...
                        </button>
                    </Fragment>)}
                </Fragment>
            ) : (<Fragment>
                <p className="text-muted">
                    No more questions to load
                </p>
            </Fragment>) }
        </div>
    )
}

const mapStateToProps = state => ({
    globalLoading: state.global.isLoading,
    page: state.ques.pageCount,
    isMoreQuestions: state.ques.isMoreQuestions
})

export default connect(mapStateToProps, {loadQuestions})(QuestionLoader);