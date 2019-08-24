import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import About from './views/About';

const RouteHandler = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/about' component={About}/>
        </Switch>
    </main>
)

export default RouteHandler;