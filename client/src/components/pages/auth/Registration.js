import React, {useState, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {setAlert} from '../../../actions/alert';
import {registerUser} from '../../../actions/auth';
import Alert from '../../layout/Alert';
import SmallSpinner from '../../layout/SmallSpinner';

const ALERT_LOCATION = 'REGISTRATION_FORM';

const Registration = ({setAlert, alertLocation, registerUser, isAuthenticated, globalLoading}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const onValueChangeHandler = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onFormSubmithandler = event => {
        event.preventDefault();
        if (password !== confirmPassword){
            setAlert('Password did not match', 'danger', ALERT_LOCATION);
        } else {
            console.log('Form Data: ', formData);
            registerUser(formData, ALERT_LOCATION);
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1><strong className="text-info">Answers Hub</strong> Registration Form</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto text-center">
                    <p>Click below to register with google</p>
                    <a href="/" className='btn btn-info btn-lg' ><i className="fab fa-google-plus-g"></i> Google</a>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <hr className='bg-info' />
                </div>
            </div>
            { alertLocation === ALERT_LOCATION && <Alert /> }
            <div className="row">
                <div className="col-lg-5 col-md-8 mx-auto">
                    <form onSubmit={onFormSubmithandler}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" placeholder='Vaibhav' required 
                                minLength='2' maxLength='32' value={firstName} onChange={onValueChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" placeholder='Kumar' required
                            minLength='2' maxLength='32' value={lastName} onChange={onValueChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" placeholder='vaibhav@gmail.com' required
                            minLength='5' maxLength='128' value={email} onChange={onValueChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password"  placeholder='***********' required
                                minLength='6' maxLength='32' value={password} onChange={onValueChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" placeholder='***********' required
                            minLength='6' maxLength='32' value={confirmPassword} onChange={onValueChangeHandler} />
                        </div>
                        <div className="form-group">
                            {!globalLoading ? (<Fragment>
                                <input type="submit" value="Register User" className='btn btn-info btn-block'/>
                            </Fragment>) : (<Fragment>
                                <button className='btn btn-info btn-block' disabled>
                                    <SmallSpinner />{` `}
                                    Register User
                                </button>
                            </Fragment>)}
                        </div>
                        <div className="form-group">
                            <p>Already have an account? 
                                <Link to='/login' className='text-info'><strong> Click here to login</strong></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Registration.propTypes = {
    alertLocation: PropTypes.string,
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation,
    globalLoading: state.global.isLoading,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, registerUser})(Registration);
