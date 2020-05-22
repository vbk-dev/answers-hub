import React, {useState, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {requestPasswrodReset} from '../../../actions/auth';
import Alert from '../../layout/Alert';
import SmallSpinner from '../../layout/SmallSpinner';

const ALERT_LOCATION = 'PASSWORD_REQUEST'

const RequestResetPassword = ({requestPasswrodReset, isAuthenticated, alertLocation, globalLoading}) => {
    const [email, setEmail] = useState('');

    const onSubmitHander = event => {
        event.preventDefault();
        requestPasswrodReset(email, ALERT_LOCATION);
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1><strong className="text-info">Answer's Hub</strong> Reset Password Form</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <hr className='bg-info' />
                </div>
            </div>
            { alertLocation === ALERT_LOCATION && <Alert /> }
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <form onSubmit={onSubmitHander}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" placeholder='vaibhav@gmail.com' required
                                minLength='5' maxLength='128' value={email} onChange={ event => { setEmail(event.target.value) } } />
                        </div>
                        <div className="form-group">
                            <p>Remember your password? 
                                <Link to='/login' className='text-info'><strong> login here</strong></Link>
                            </p>
                        </div>
                        <div className="form-group">
                            {!globalLoading ? (<Fragment>
                                    <input type="submit" value="Reset Password" className='btn btn-info btn-block'/>
                                </Fragment>) : (<Fragment>
                                    <button className='btn btn-info btn-block' disabled>
                                        <SmallSpinner />{` `}
                                        Reset Password
                                    </button>
                                </Fragment>)}
                        </div>
                        <div className="form-group">
                            <p>Don't have an account? 
                                <Link to='/registration' className='text-info'><strong> Click here to register</strong></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation,
    globalLoading: state.global.isLoading,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {requestPasswrodReset})(RequestResetPassword);