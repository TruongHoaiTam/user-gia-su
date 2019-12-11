import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { actLoginRequest, actGetUser, actLogout } from '../../actions/Auth';
import { Button } from 'antd';
import './style.css';

class Navbar extends React.Component {
  render() {
    const { username, actLogout } = this.props;
    let login, logout, register_learner, register_teacher;
    if (username && username !== undefined) {
      logout = (
        <Menu.Item key="logout">
          <Button onClick={actLogout}>Logout</Button>
        </Menu.Item>
      );
    } else {
      login = (
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      );
      register_learner = (
        <Menu.Item key="register-learner">
          <Link to="/register-learner">Register For Learner</Link>
        </Menu.Item>
      );
      register_teacher = (
        <Menu.Item key="register-teacher">
          <Link to="/register-teacher">Register For Teacher</Link>
        </Menu.Item>
      );
    }
    return (
      <Menu mode="horizontal" className="navbar">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="teacher">
          <Link to="/teacher">Teacher page</Link>
        </Menu.Item>
        <Menu.Item key="teacher-detail">
          <Link to="/teacher-detail">Teacher detail</Link>
        </Menu.Item>
        {logout}
        {login}
        {register_learner}
        {register_teacher}
      </Menu>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
