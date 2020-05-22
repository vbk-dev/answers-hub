import React, {useEffect, useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import {resetLinkVerification, resetVerificationToggler, resetPassword} from '../../../actions/auth';
import {setAlert} from '../../../actions/alert';

import InvalidLink from '../../layout/error/InvalidLink';
import Alert from '../../layout/Alert';
import SmallSpinner from '../../layout/SmallSpinner';
import Spinner from '../../layout/Spinner';

const ALERT_LOCATION = 'RESET_PASSWORD';

const ResetPassword = ({match, resetLinkVerification, isResetLinkValid, isAuthenticated, globalLoading, 
                            resetVerificationToggler, alertLocation, setAlert, resetPassword, history}) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const {password, confirmPassword} = formData;
    
    useEffect(()=>{
        const {token, id} = match.params;
        resetLinkVerification(token, id);
    }, []);

    const onSubmitHander = event => {
        event.preventDefault();
        console.log({formData})
        if (password !== confirmPassword){
            setAlert('Password did not match', 'danger', ALERT_LOCATION);
        } else {
            resetPassword(match.params.id, password, confirmPassword, history);
        }
    }

    const onChangeHandler = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    if (isAuthenticated) {
        resetVerificationToggler();
        return <Redirect to='/' />
    }

    const resetForm = (<div className="container my-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1><strong className="text-info">Answers Hub</strong> Reset Password</h1>
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
                            <label htmlFor="password">New Password</label>
                            <input type="password" className="form-control" name="password" placeholder='****************' required
                                minLength='6' maxLength='32' value={password} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" placeholder='****************' required
                                minLength='6' maxLength='32' value={confirmPassword} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                        {!globalLoading ? (<Fragment>
                                <input type="submit" value="Update password" className='btn btn-info btn-block'/>
                            </Fragment>) : (<Fragment>
                                <button className='btn btn-info btn-block' disabled>
                                    <SmallSpinner />{` `}
                                    Update password
                                </button>
                            </Fragment>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>);

    let display = null;

    if (isResetLinkValid) {
        display = resetForm;
    } else if (!isResetLinkValid && globalLoading){
        display = (<div className="container">
                    <div className="row">
                        <div className="col-lg-12 mt-5 text-center">
                            <Spinner />
                        </div>
                    </div>
                </div>)
    } else {
        display = <Fragment><InvalidLink /></Fragment>
    }

    return (
        <Fragment>
            {display}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isResetLinkValid: state.global.isResetLinkVerified,
    alertLocation: state.global.alertLocation,
    globalLoading: state.global.isLoading,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {resetLinkVerification, resetVerificationToggler, setAlert, resetPassword})(withRouter(ResetPassword));
