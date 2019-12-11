import React from 'react';
import UpdateInfoRegisterForm from '../components/UpdateInfoRegisterForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../actions/Auth';

class UpdateInfoRegisterPage extends React.Component {
  render() {
    const { username, actGetUser } = this.props;
    actGetUser();
    if (username && username !== undefined) {
      return (
        <div>
          <p className="title">UPDATE INFOMATION REGISTER</p>
          <UpdateInfoRegisterForm history={this.history} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
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

  err: state.auth.err
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInfoRegisterPage);
