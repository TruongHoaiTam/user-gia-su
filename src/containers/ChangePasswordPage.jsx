import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';
import { connect } from 'react-redux';
import { callApiChangePassword } from '../utils/apiCaller';

class ChangePasswordForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        const { _id } = this.props;
        values._id = _id;
        return callApiChangePassword(values)
          .then(() => {
            const { actLogout } = this.props;
            actLogout();
          })
          .catch(err => {
            const { info } = Modal;
            info({
              title: 'Thông báo',
              content: `Thay đổi mật khẩu thất bại`
            });
          });
      }
      return err;
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { username, status } = this.props;
    if (username && username !== undefined && status === 'active') {
      return (
        <div>
          <p className="title">CHANGE PASSWORD</p>
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="register-form"
          >
            <Form.Item label="Old password" hasFeedback>
              {getFieldDecorator('old_password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your old password!'
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="New password" hasFeedback>
              {getFieldDecorator('new_password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your new password!'
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Change password
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    } else {
      return null;
    }
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

const ChangePasswordPage = Form.create({ name: 'change-password' })(
  ChangePasswordForm
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
