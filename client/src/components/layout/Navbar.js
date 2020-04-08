import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
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
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/registration">Registration</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
