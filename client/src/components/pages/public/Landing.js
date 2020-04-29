import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'query-string';

import {fetchQuestionList} from '../../../actions/question';
import Questions from '../../layout/question/Questions';
import Alert from '../../layout/Alert';

const ALERT_LOCATION = 'INDEX';

const Landing = ({ alertLocation, location, fetchQuestionList, isLoading }) => {

    useEffect(() => {
        const searchedTerm = queryString.parse(location.search).search;
        fetchQuestionList(searchedTerm);
        // eslint-disable-next-line
    }, [fetchQuestionList]);

    return <div className="container my-4">
        { alertLocation === ALERT_LOCATION && <Alert /> }
        <div className="row">
            <div className="col-lg-12">
                <h1 className="text-info">Recently asked questions</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-9">
                { !isLoading && (<Questions />) }
            </div>
            <div className="col-lg-3">
                <div className="card my-2">
                    <h4 className='mt-3 text-center'>Key Operations</h4>
                    <div className="card-body">
                        <Link to='/ask-question' className='btn btn-info btn-block'>Ask you question</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation,
    isLoading: state.ques.isLoading
})

export default connect(mapStateToProps, {fetchQuestionList})(Landing);
