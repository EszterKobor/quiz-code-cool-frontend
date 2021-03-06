import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from 'context/UserContext';
import {routes} from "util/routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  const {usernameState} = useContext(UserContext);
  const username = usernameState[0];

  return (
    <Route
      {...rest}
      render={(props) =>
        username ? <Component {...props} /> : <Redirect to={{pathname: routes.auth.signIn }}/>
      }
    />
  );
}
