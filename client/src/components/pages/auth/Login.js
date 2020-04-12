import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {loginUser} from '../../../actions/auth';
import Alert from '../../layout/Alert';

const ALERT_LOCATION = 'LOGIN_FORM';

const Login = ({ alertLocation, loginUser, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onValueChangeHandler = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onFormSubmithandler = event => {
        event.preventDefault();
        console.log(formData);
        loginUser(formData, ALERT_LOCATION)
    }
    
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1><strong className="text-info">Answer's Hub</strong> Login Form</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto text-center">
                    <p>Click below to Login with google</p>
                    <a href="/" className='btn btn-info btn-lg' ><i class="fab fa-google-plus-g"></i> Google</a>
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
                    <form onSubmit={onFormSubmithandler}>
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
                            <p>Forgot your password? 
                                <Link to='/password-reset' className='text-info'><strong> Reset Password here</strong></Link>
                            </p>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className='btn btn-info btn-block'/>
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
    )
}

Login.propTypes = {
    alertLocation: PropTypes.string,
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    alertLocation: state.global.alertLocation,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login);
