import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "../style.css";

import store from "../store";

import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterLearnerPage from "./RegisterLearnerPage";
import RegisterTeacherPage from "./RegisterTeacherPage";
import LearnerPage from "./LearnerPage";
import TeacherListPage from "./TeacherListPage/index";
import TeacherPage from "./TeacherPage";
import Navbar from "../components/Navbar/index";
import TeacherDetailPage from "./TeacherDetailPage/index";
import UpdateInfoRegisterPage from "./UpdateInfoRegisterPage";
import ContractPage from "./Contract/index";
import ContractLearnerPage from "./ContractLearnerPage";
import ContractTeacherPage from "./ContractTeacherPage";
import ContractDetailPage from "./ContractDetailPage/index";
import RevenuePage from "./RevenuePage";
import ChangePasswordPage from "./ChangePasswordPage";
import MyFooter from "../components/Footer";

const { Header, Content, Footer } = Layout;

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Header className="header">
          <Navbar></Navbar>
        </Header>
        <Content style={{ minHeight: 700 }}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register-learner" component={RegisterLearnerPage} />
            <Route path="/register-teacher" component={RegisterTeacherPage} />
            <Route path="/change-password" component={ChangePasswordPage} />
            <Route path="/learner" component={LearnerPage} />
            <Route path="/teacher-detail" component={TeacherDetailPage} />
            <Route path="/teacher-list" component={TeacherListPage} />
            <Route path="/teacher" component={TeacherPage} />
            <Route path="/contract" component={ContractPage} />
            <Route path="/contract-learner" component={ContractLearnerPage} />
            <Route path="/contract-detail" component={ContractDetailPage} />
            <Route path="/contract-teacher" component={ContractTeacherPage} />
            <Route path="/revenue" component={RevenuePage} />
            <Route
              path="/update-info-register"
              component={UpdateInfoRegisterPage}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </Content>
        <Footer className="footer-box">
          <MyFooter></MyFooter>
        </Footer>
      </Layout>
    </BrowserRouter>
  </Provider>
);

export default Root;
