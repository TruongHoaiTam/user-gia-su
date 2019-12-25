import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import {
  actLoginRequest,
  actGetUser,
  actLogout,
  actSaveIntroduction
} from '../actions/Auth';
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
        values.tags = localStorage.getItem('tags_display');
        values.token = localStorage.getItem('token');
        console.log(values);
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
      }
      return err;
    });
  };

  componentDidUpdate() {
    const { actGetUser } = this.props;
    actGetUser();
  }

  render() {
    const {
      username,
      status,

      tags,
      teaching_address,
      price_per_hour,
      introduce
    } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (username && username !== undefined && status === 'active') {
      return (
        <div>
          <Form onSubmit={this.handleSubmit} className="introduce-form">
            <Form.Item>
              {getFieldDecorator('introduce', {
                rules: [
                  { required: true, message: 'Please input your introduce!' }
                ],
                initialValue: introduce
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
                ],
                initialValue: teaching_address
              })(<Input placeholder="Nhập địa chỉ dạy" />)}
            </Form.Item>
            <NumericInputDemo price_per_hour={price_per_hour} />
            <EditableTagGroup tags={tags} />
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

  all_tags: state.auth.all_tags,

  introduce: state.auth.introduce,
  teaching_address: state.auth.teaching_address,
  price_per_hour: state.auth.price_per_hour,
  tags: state.auth.tags
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout()),

  actSaveIntroduction: info => dispatch(actSaveIntroduction(info))
});

const IntroduceForm = Form.create({ name: 'normal_introduce' })(
  NormalIntroduceForm
);

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceForm);
