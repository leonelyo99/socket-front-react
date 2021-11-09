import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginView } from "../modules/auth/views/LoginView";
import { RegisterView } from "../modules/auth/views/RegisterView";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginView} />
      <Route exact path="/auth/register" component={RegisterView} />
      <Redirect to="/auth/login" />
    </Switch>
  );
};
