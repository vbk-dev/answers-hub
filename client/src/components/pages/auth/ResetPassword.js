import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// const ALERT_LOCATION = 'RESET_PASSWORD'

const ResetPassword = ({  }) => {
    const [email, setEmail] = useState('');

    const onSubmitHander = event => {
        event.preventDefault();
        console.log(email);
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
            {/* { alertLocation === ALERT_LOCATION && <Alert /> } */}
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
                            <input type="submit" value="Reset password" className='btn btn-info btn-block'/>
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

});

export default connect(mapStateToProps)(ResetPassword);