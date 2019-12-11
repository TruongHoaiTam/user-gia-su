import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';
import NumericInputDemo from '../components/NumericInputDemo';
import EditableTagGroup from '../components/EditableTagGroup';
import { callApiIntroduction } from '../utils/apiCaller';
import '../index.css';
const { TextArea } = Input;

class NormalIntroduceForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.price_per_hour = localStorage.getItem('price_per_hour');
        values.tags = localStorage.getItem('tags');
        values.token = localStorage.getItem('token');
        console.log('Received values of form: ', values);
        return callApiIntroduction(values)
          .then(() => {
            const { history } = this.props;
            history();
          })
          .catch(() => {
            const { info } = Modal;
            info({
              title: 'Thông báo',
              content: `Cập nhật thông tin giới thiệu thất bại`
            });
          });
        /* const { actSaveIntroduction } = this.props;
        actSaveIntroduction(values) */
      }
      return err;
    });
  };

  render() {
    const { username, actGetUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    actGetUser();

    if (username && username !== undefined) {
      return (
        <div>
          <Form onSubmit={this.handleSubmit} className="introduce-form">
            <Form.Item>
              {getFieldDecorator('introduce', {
                rules: [
                  { required: true, message: 'Please input your introduce!' }
                ]
              })(
                <TextArea
                  placeholder="Nhập thông tin giới thiệu về người dạy"
                  autoSize={{ minRows: 5, maxRows: 20 }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('teaching_address', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your teaching address!'
                  }
                ]
              })(<Input placeholder="Nhập địa chỉ dạy" />)}
            </Form.Item>
            <NumericInputDemo />
            <EditableTagGroup />
            <Form.Item>
              <Button type="primary" htmlType="submit" className="save-button">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  phone: state.auth.phone,
  fullname: state.auth.fullname,
  avatar: state.auth.avatar,
  dob: state.auth.dob,
  address: state.auth.address,

  token: state.auth.token,
  strategy: state.auth.strategy,
  token_fb_gg: state.auth.token_fb_gg,

  err: state.auth.err,

  introduce: state.teacher.introduce,
  teaching_address: state.teacher.teaching_address,
  price_per_hour: state.teacher.price_per_hour,
  tags: state.teacher.tags
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())

  // actSaveIntroduction: info => dispatch(actSaveIntroduction(info))
});

const IntroduceForm = Form.create({ name: 'normal_introduce' })(
  NormalIntroduceForm
);

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceForm);
