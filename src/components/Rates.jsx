import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Rate } from 'antd';
import { callApiAddRate } from '../utils/apiCaller';
import { connect } from 'react-redux';
import { actSetCurrentTeacher } from '../actions/Detail';

const Editor = ({ onChange, onSubmit, value }) => (
  <div>
    <Form.Item>
      <Rate allowHalf defaultValue={parseInt(value)} onChange={onChange} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Rate
      </Button>
    </Form.Item>
  </div>
);

class Rates extends React.Component {
  state = {
    value: 0
  };

  componentWillMount() {
    const { current_teacher } = this.props;
    this.setState({
      value: current_teacher.rate
    });
  }

  handleChange = e => {
    this.setState({
      value: e
    });
  };

  handleSubmit = () => {
    if (!this.state.value && this.state.value === 0) {
      return;
    }

    const { current_teacher } = this.props;
    let item = {
      _id: current_teacher._id,
      rate: this.state.value
    };
    callApiAddRate(item).then(() => {
      console.log('add');
    });
  };

  render() {
    const { value } = this.state;
    const { username, strategy, status } = this.props;

    return (
      <div>
        {username &&
          username !== undefined &&
          strategy === 'learner' &&
          status === 'active' && (
            <Editor
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              value={value}
            />
          )}
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

  err: state.auth.err,

  current_teacher: state.detail.current_teacher
});

const mapDispatchToProps = dispatch => ({
  actSetCurrentTeacher: current_teacher =>
    dispatch(actSetCurrentTeacher(current_teacher))
});

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
