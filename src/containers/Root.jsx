import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../store';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterLearnerPage from './RegisterLearnerPage';
import RegisterTeacherPage from './RegisterTeacherPage';
import LearnerPage from './LearnerPage';
import TeacherPage from './TeacherPage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register-learner" component={RegisterLearnerPage} />
        <Route exact path="/register-teacher" component={RegisterTeacherPage} />
        <Route exact path="/learner" component={LearnerPage} />
        <Route exact path="/teacher" component={TeacherPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
