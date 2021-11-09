import React from 'react';
import Proptypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            component={(props) => (
                (isAuthenticated) ?
                    <Redirect to="/" /> :
                    <Component {...props} />
            )
            }
        />
    )
}

PublicRoute.prototype = {
    isAuthenticated: Proptypes.bool.isRequired,
    component: Proptypes.func.isRequired
}