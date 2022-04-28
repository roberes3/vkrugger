import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../view/Login';
import HomePage from '../view/Home';
import InsertPage  from '../view/InsertUser';
import UpdatePage  from '../view/UpdateUser';
import QueryPage  from '../view/QueryUser';

import * as ROUTE from './const';

// Vistas de la aplicacion
const AppRoutes = () => (

      <div>
          <Switch>
            <Route path={ROUTE.LOGIN}    component={LoginPage} exact/>
            <Route path={ROUTE.HOME}     component={HomePage} exact/>
            <Route path={ROUTE.INSERT}   component={InsertPage} exact/>
            <Route path={ROUTE.UPDATE}   component={UpdatePage} exact/>
            <Route path={ROUTE.QUERY}    component={QueryPage} exact/>
            <Route path={ROUTE.INIT}     component={LoginPage} />
          </Switch>
      </div>

);

export default AppRoutes;