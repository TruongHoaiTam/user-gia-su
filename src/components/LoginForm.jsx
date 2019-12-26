import React from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox, Modal } from "antd";
import { Redirect, Link } from "react-router-dom";

import { actLoginRequest, actGetUser, actLogout } from "../actions/Auth";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { actLoginRequest } = this.props;
        actLoginRequest(values);
      }
    });
  };

  componentDidUpdate() {
    const { actGetUser } = this.props;
    actGetUser();
  }

  render() {
    const { username, status, strategy, err } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (username && username !== undefined && status === "active") {
      if (strategy === "learner") return <Redirect to="/learner" />;
      return <Redirect to="/teacher" />;
    }
    if (err === "BLOCK") {
      const { info } = Modal;
      info({
        title: "Thông báo",
        content: `Tài khoản của bạn đã bị khóa`
      });
    }
    if (err === 400) {
      const { info } = Modal;
      info({
        title: "Thông báo",
        content: `Đăng nhập thất bại`
      });
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Mời bạn nhập username!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Mời bạn nhập mật khẩu!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Link to="/forgot-password" className="login-form-forgot">
              Quên mật khẩu
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <Link to="/register-learner">Đăng kí học!</Link>
            <br />
            <Link to="/register-teacher">Đăng kí dạy!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  _id: state.auth._id,
  username: state.auth.username,
  email: state.auth.email,
  phone: state.auth.phone,
  fullname: state.auth.fullname,
  avatar: state.auth.avatar,
  birthday: state.auth.birthday,
  address: state.auth.address,

  status: state.auth.status,
  token: state.auth.token,
  strategy: state.auth.strategy,
  token_fb_gg: state.auth.token_fb_gg,

  err: state.auth.err
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
