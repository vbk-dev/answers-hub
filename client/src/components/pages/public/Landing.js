import React from 'react';

import Questions from '../../layout/question/Questions';
import { Link } from 'react-router-dom';
import Alert from '../../layout/Alert';
import {connect} from 'react-redux';

const ALERT_LOCATION = 'INDEX';

const Landing = ({ alertLocation }) => {

    return <div className="container my-4">
        { alertLocation === ALERT_LOCATION && <Alert /> }
        <div className="row mb-3">
            <div className="col-lg-12">
                <h1 className="text-info">Recently asked questions</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-9">
                <Questions />
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
    alertLocation: state.global.alertLocation
})

export default connect(mapStateToProps)(Landing);
