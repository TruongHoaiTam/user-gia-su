import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Input, Select, Button, Modal, DatePicker } from 'antd';
import Avatar from './Avatar';
import { callApiUpdateInfoRegister } from '../utils/apiCaller';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';

const { Option } = Select;

class UpdateInfoRegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.avatar = localStorage.getItem('imageUrl');
        values.token = localStorage.getItem('token');
        return callApiUpdateInfoRegister(values)
          .then(() => {
            const { history } = this.props;
            history();
          })
          .catch(err => {
            const { info } = Modal;
            info({
              title: 'Thông báo',
              content: `Cập nhật thông tin thất bại`
            });
          });
      }
      return err;
    });
  };

  render() {
    const {
      username,
      status,
      email,
      phone,
      fullname,
      avatar,
      birthday,
      address
    } = this.props;
    const birthday_moment =
      birthday.slice(0, 4) +
      '/' +
      birthday.slice(5, 7) +
      '/' +
      birthday.slice(8, 10);
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84'
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    );

    if (username && username !== undefined && status === 'active') {
      return (
        <div>
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="register-form"
          >
            <Avatar value={avatar} />
            <Form.Item label="Username">
              {getFieldDecorator('username', {
                initialValue: username
              })(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  }
                ],
                initialValue: email
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Full Name">
              {getFieldDecorator('fullname', {
                initialValue: fullname
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                initialValue: phone
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              )}
            </Form.Item>
            <Form.Item label="Birthday">
              {getFieldDecorator('birthday', {
                initialValue: moment(birthday_moment, 'YYYY-MM-DD')
              })(<DatePicker />)}
            </Form.Item>
            <Form.Item label="Address">
              {getFieldDecorator('address', {
                initialValue: address
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
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

  err: state.auth.err,

  introduce: state.auth.introduce,
  teaching_address: state.auth.teaching_address,
  price_per_hour: state.auth.price_per_hour,
  tags: state.auth.tags
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

const UpdateInfoRegisterForm = Form.create({ name: 'normal_update' })(
  UpdateInfoRegistrationForm
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInfoRegisterForm);
