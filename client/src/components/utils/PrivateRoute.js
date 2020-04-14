import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Spinner from '../layout/Spinner';

const PrivateRoute = ({ isLoading, isAuthenticated, component:Component, ...rest }) => (
    <Route {...rest} render={ 
            props => isLoading ? ( <Spinner /> ) : 
                isAuthenticated ? ( <Component {...props} /> ) : ( <Redirect to="/login" /> )
        }
    />
);

const mapToState = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

export default connect(mapToState)(PrivateRoute);