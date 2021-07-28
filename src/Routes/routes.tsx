import React from 'react'
import { BrowserRouter, Switch } from "react-router-dom";
import Header from '../components/Header';

import CreateUser from '../components/Login/CreateUser';
import Users from '../components/Users';
import { Route } from './Route';


const Routes = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" component={CreateUser} exact />
            <Route path="/login" component={CreateUser} />
            <Route path="/users" component={Users} isPrivate/>
        </Switch>
    </BrowserRouter>
);

export default Routes;