import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth';

import Home from './pages/Home/Home';
import Repos from './pages/Repos/Repos';

const PrivateRoute = ({ component: Component, ...rest }) =>(
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    )}/>
)

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <PrivateRoute path='/repos' component={Repos} />
            </Switch>
        </BrowserRouter>
    );
}