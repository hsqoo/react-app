import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './components/home/home'
import Musiclist from './components/musiclist/musiclist'
import Login from './components/login/login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Switch>
    <Route path="/musiclist" component={Musiclist}></Route>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
