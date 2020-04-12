import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logoutUser} from '../../actions/auth';

const Navbar = ({logoutUser, isAuthenticated}) => {

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
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" id="profileDropdown" role="button" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user"></i>{' '}Profile
                </Link>
                <div className="dropdown-menu" aria-labelledby="profileDropdown">
                    <a className="dropdown-item" href="!#">My Profile</a>
                    <Link className="dropdown-item" onClick={logoutHander}>Logout</Link>
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
                    { isAuthenticated ? authLinks: unauthLinks }
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
