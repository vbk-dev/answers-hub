import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logoutUser} from '../../actions/auth';

const Navbar = ({logoutUser, isAuthenticated, name, isLoading}) => {

    const logoutHander = event => {
        logoutUser();
    }

    const unauthLinks = (
        <Fragment>
            <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/registration">Registration</Link>
            </li>
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle" href='/' id="profileDropdown" role="button" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">
                    {name}
                </a>
                <div className="dropdown-menu" aria-labelledby="profileDropdown">
                    <Link className="dropdown-item" to='/user/profile'>Profile</Link>
                    <a className="dropdown-item" href='#!' onClick={logoutHander}>Logout</a>
                </div>
            </li>
        </Fragment>
    )

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info px-5">
            <Link className="navbar-brand" to="/">
                <strong>Answer's Hub</strong>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    { isLoading ? null : isAuthenticated ? authLinks : unauthLinks }
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    name: state.auth.user ? state.auth.user.firstName : ''
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
