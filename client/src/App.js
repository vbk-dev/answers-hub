import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/layout/Navbar';

import Landing from './components/pages/public/Landing';
import Login from './components/pages/auth/Login';
import Registration from './components/pages/auth/Registration';
import ResetPassword from './components/pages/auth/ResetPassword';
import AskQuestion from './components/pages/private/question/AskQuestion';
import EditQuestion from './components/pages/private/question/EditQuestion'
import Question from './components/pages/public/Question';
import PageNotFound from './components/pages/error/PageNotFound';
import Profile from './components/pages/private/user/Profile';

import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import store from './store';

import PrivateRoute from './components/utils/PrivateRoute';
import setAuthToken from './utils/set-header-token';

if (localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(()=>{
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/' component={Landing} exact />
                        <Route path='/registration' component={Registration} exact />
                        <Route path='/login' component={Login} exact />
                        <Route path='/password-reset' component={ResetPassword} exact />
                        <Route path='/question/:id/:title' component={Question} exact />
                        <PrivateRoute path='/ask-question' component={AskQuestion} exact />
                        <PrivateRoute path='/user/profile' component={Profile} exact />
                        <PrivateRoute path='/edit-question/:id/:title' component={EditQuestion} exact />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default App
