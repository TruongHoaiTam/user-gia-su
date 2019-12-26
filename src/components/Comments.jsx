import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { callApiAddComment } from '../utils/apiCaller';
import { connect } from 'react-redux';
import { actSetCurrentTeacher } from '../actions/Detail';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Comments extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: ''
  };

  componentWillMount() {
    const { current_teacher } = this.props;
    this.setState({
      comments: current_teacher.comment ? current_teacher.comment : []
    });
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    const { fullname, avatar } = this.props;
    const new_comment = {
      fullname: fullname,
      avatar: avatar,
      content: this.state.value
    };

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [new_comment, ...this.state.comments]
      });
    }, 1000);

    const { current_teacher } = this.props;
    let item = {
      _id: current_teacher._id,
      comment: new_comment
    };
    callApiAddComment(item).then(() => {
      console.log('add');
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    const { username, strategy, status, fullname, avatar } = this.props;
    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        {username &&
          username !== undefined &&
          strategy === 'learner' &&
          status === 'active' && (
            <Comment
              avatar={
                <Avatar
                  src={
                    avatar === 'uploads\no-avatar.jpg'
                      ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                      : avatar
                  }
                  alt={fullname}
                />
              }
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
