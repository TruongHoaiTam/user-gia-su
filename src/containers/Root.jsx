import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../store';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterLearnerPage from './RegisterLearnerPage';
import RegisterTeacherPage from './RegisterTeacherPage';
import LearnerPage from './LearnerPage';
import TeacherListPage from './TeacherListPage/index';
import TeacherPage from './TeacherPage';
import Navbar from '../components/Navbar/index';
import TeacherDetail from './TeacherDetail/index';
import UpdateInfoRegisterPage from './UpdateInfoRegisterPage';

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
        <Route path="/teacher-list" component={TeacherListPage} />
        <Route path="/teacher" component={TeacherPage} />
        <Route
          path="/update-info-register"
          component={UpdateInfoRegisterPage}
        />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
