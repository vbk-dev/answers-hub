import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import SearchBar from './components/layout/SearchBar';

import Landing from './components/pages/public/Landing';
import Login from './components/pages/auth/Login';
import Registration from './components/pages/auth/Registration';
import AskQuestion from './components/pages/private/AskQuestion';
import EditQuestion from './components/pages/private/EditQuestion';
import Question from './components/pages/public/Question';
import PageNotFound from './components/pages/error/PageNotFound';

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
                    <SearchBar />
                    <Switch>
                        <Route path='/' component={Landing} exact />
                        <Route path='/registration' component={Registration} exact />
                        <Route path='/login' component={Login} exact />
                        <Route path='/question/:id/:title' component={Question} exact />
                        <PrivateRoute path='/ask-question' component={AskQuestion} exact />
                        <PrivateRoute path='/edit-question/:id/:title' component={EditQuestion} exact />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default App
