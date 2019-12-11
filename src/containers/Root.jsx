import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../store';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterLearnerPage from './RegisterLearnerPage';
import RegisterTeacherPage from './RegisterTeacherPage';
import LearnerPage from './LearnerPage';
import TeacherPage from './TeacherPage/index';
import Navbar from '../components/Navbar';
import TeacherDetail from './TeacherDetail/index';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register-learner" component={RegisterLearnerPage} />
        <Route path="/register-teacher" component={RegisterTeacherPage} />
        <Route path="/learner" component={LearnerPage} />
        <Route path="/teacher-detail" component={TeacherDetail} />
        <Route path="/teacher" component={TeacherPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
