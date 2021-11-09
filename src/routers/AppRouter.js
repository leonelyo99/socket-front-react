import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { PageView } from "../modules/page/views/PageView";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={!!token}
          />
          <PrivateRoute
            exact
            path="/"
            component={PageView}
            isAuthenticated={!!token}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
