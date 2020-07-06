import React from 'react';
import AllCars from './AllCars';
import UpdateCar from './UpdateCar';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
import AddCar from './AddCar';
import PrivateRoute from '../routing/PrivateRoute';
import Alert from '../layout/Alert';

const Admin = () => {
  return (
    <div className="admin-wrapper">
      <aside>
        <div style={{ width: '100%', height: '10px' }}></div>
        <h1>
          <Link style={{ color: '#ddd', textDecoration: 'none' }} exact to="/">
            <i className="fas fa-home"></i>
          </Link>
          Admin Panel
        </h1>

        <ul className="admin-links">
          <Link to="/admin">
            <li>
              <i className="fas fa-car"></i>
              Все авто
            </li>
          </Link>
          <Link to="/admin/add-car">
            <li>
              <i className="fas fa-plus-square"></i>Добавить авто
            </li>
          </Link>
        </ul>
      </aside>
      <main>
        <Alert />
        <Switch>
          <PrivateRoute exact path="/admin" component={AllCars} />
          <PrivateRoute exact path="/admin/add-car" component={AddCar} />
          <PrivateRoute exact path="/admin/update-car/:id" component={UpdateCar} />
        </Switch>
      </main>
    </div>
  );
};

export default Admin;
