import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const user = useSelector(state => state.user.isLogedin)    
    return (
        <Route {...rest} render={props => (
            user && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;