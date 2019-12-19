import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';

class LearnerPage extends React.Component {
  componentDidUpdate() {
    const { actGetUser } = this.props;
    actGetUser();
  }

  render() {
    const { username, strategy, status } = this.props;
    if (
      username &&
      username !== undefined &&
      status === 'active' &&
      strategy === 'learner'
    ) {
      return (
        <div>
          <p className="title">LEARNER PAGE</p>
        </div>
      );
    } else {
      return <Redirect to="/" />;
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

export default connect(mapStateToProps, mapDispatchToProps)(LearnerPage);
