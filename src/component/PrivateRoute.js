import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { usernameState } = useContext(AuthContext);
  const username = usernameState[0];

  return (
    <Route
      {...rest}
      render={(props) =>
        username !== "" ? <Component {...props} /> : <Redirect to={{pathname: '/sign-in' }}/>
      }
    />
  );
}