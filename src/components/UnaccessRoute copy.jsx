import React from "react";
import {
  BrowserRouter as Router,
 
  Route,

  Redirect,

} from "react-router-dom";
import AuthService from './../services/auth.service'
export default function UnaccessRoute({ children, ...rest }) {

    

    return (
      <Route
        {...rest}
        render={({ location }) =>
          !AuthService.getCurrentUser() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/user",
                state: { from: location }
              }}
            />
          )
          
        }
      />
    );
  }
  