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
    const { username, strategy, actLogout, actGetUser } = this.props;
    let login,
      logout,
      register_learner,
      register_teacher,
      learner,
      teacher,
      update_info_register;
    actGetUser();
    if (username && username !== undefined) {
      logout = (
        <Menu.Item key="logout">
          <Button onClick={actLogout}>Logout</Button>
        </Menu.Item>
      );
      update_info_register = (
        <Menu.Item key="update_info_register">
          <Link to="/update-info-register">Update Info Register</Link>
        </Menu.Item>
      );
      if (strategy === 'learner') {
        learner = (
          <Menu.Item key="learner">
            <Link to="/learner">Learner</Link>
          </Menu.Item>
        );
      } else if (strategy === 'teacher') {
        teacher = (
          <Menu.Item key="teacher">
            <Link to="/teacher">Teacher</Link>
          </Menu.Item>
        );
      }
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
<<<<<<< HEAD
        <Menu.Item key="teacher-list">
          <Link to="/teacher-list">Teacher page</Link>
=======
<<<<<<<< HEAD:src/components/Navbar/index.jsx
        <Menu.Item key="teacher">
          <Link to="/teacher">Teacher page</Link>
>>>>>>> 7afe7210f57073b897336c43a7b8f742112476a3
        </Menu.Item>
        <Menu.Item key="teacher-detail">
          <Link to="/teacher-detail">Teacher detail</Link>
        </Menu.Item>
<<<<<<< HEAD
        {learner}
        {teacher}
=======
========
        {learner}
        {teacher}
>>>>>>>> 7afe7210f57073b897336c43a7b8f742112476a3:src/components/Navbar.jsx
>>>>>>> 7afe7210f57073b897336c43a7b8f742112476a3
        {logout}
        {login}
        {register_learner}
        {register_teacher}
        {update_info_register}
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
