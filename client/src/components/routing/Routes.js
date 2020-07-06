import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Main from '../layout/Main';
import CarDetails from '../layout/CarDetails';
import Navbar from '../layout/Navbar';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
        <Route exact path="/" component={Main} />
        <Route exact path="/car-details/:id" component={CarDetails} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
