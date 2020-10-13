import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Loggin from './components/Loggin';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Index from './components/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component = {Index}/>
        <Route path='/login' exact component = {Loggin}/>
        <Route path='/register' exact component = {Register}/>
        <Route path='/dashboard' exact component = {Dashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
