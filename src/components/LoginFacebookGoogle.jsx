import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import {
  actLoginRequest,
  actGetUser,
  actLogout,
  actLoginFacebookRequest,
  actLoginGoogleRequest
} from '../actions/Auth';


class LoginFacebookGoogle extends React.Component {
  facebookResponse = e => {
    const options = { access_token: e.accessToken };
    const { actLoginFacebookRequest } = this.props;
    actLoginFacebookRequest(options);
  };

  googleResponse = e => {
    const options = { access_token: e.accessToken };
    const { actLoginGoogleRequest } = this.props;
    actLoginGoogleRequest(options);
  };

  onFailure = error => {
    const { info } = Modal;
    info(error);
  };

  render() {
    return (
      <div>
        <div className="login-form">
          <div style={{ display: 'block' }}>
            <div className="btn">
              <FacebookLogin
                cssClass="btnFacebook"
                appId="975638769468030"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.facebookResponse}
              />
              <br />
              <GoogleLogin
                className="btnGoogle"
                clientId="384897073821-irhgosv3cmfov3plu6315bf4dnkhjqr7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
              />
            </div>
          </div>
        </div>
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
  dob: state.auth.dob,
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
  actLogout: () => dispatch(actLogout()),
  actLoginFacebookRequest: options =>
    dispatch(actLoginFacebookRequest(options)),
  actLoginGoogleRequest: options => dispatch(actLoginGoogleRequest(options))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFacebookGoogle);
