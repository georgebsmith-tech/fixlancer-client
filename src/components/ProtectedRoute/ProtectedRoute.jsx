import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ isAuth, component:Component, location, ...rest }) => {
  
    return (
        <Route
            {...rest}
            render={() => {
                return isAuth ? <Component /> : <Redirect to={{ pathname: "/login", state: { location } }} />

            }}
        />
    );
}

export default ProtectedRoute;
