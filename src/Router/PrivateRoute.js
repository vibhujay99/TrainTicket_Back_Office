import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../Utils/Requests/Auth";

// Define a component named 'PrivateRoute' that takes 'component' and 'rest' as props
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    // Render the route based on the result of 'isAuthenticated()'
    render={props =>
      isAuthenticated() ? ( // Check if the user is authenticated
        // If authenticated, render the specified 'Component' with the given 'props'
        <Component {...props} />
      ) : (
        // If not authenticated, redirect to the "/signin" route and pass the current location as state
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// Export the 'PrivateRoute' component as the default export of this module
export default PrivateRoute;
