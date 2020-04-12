import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/layout/Navbar';

import Landing from './components/pages/public/Landing';
import Login from './components/pages/auth/Login';
import Registration from './components/pages/auth/Registration';
import PageNotFound from './components/pages/error/PageNotFound';

import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import store from './store';


const App = () => {
    useEffect(()=>{
        store.dispatch(loadUser());
    }, [])

    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/' component={Landing} exact />
                        <Route path='/registration' component={Registration} exact />
                        <Route path='/login' component={Login} exact />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default App
