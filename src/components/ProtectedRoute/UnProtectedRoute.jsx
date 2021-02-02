import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const UnprotectedRoute = ({ isAuth, Component, location, ...rest }) => {
    console.log(location)
    return (
        <Route
            {...rest}
            render={() => {
                return isAuth ? <Redirect to={{ path: "/dashboard", state: { location } }} /> :
                    null
            }}
        />
    );
}

export default UnprotectedRoute;
