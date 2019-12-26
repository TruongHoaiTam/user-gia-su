import React from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { actLoginRequest, actGetUser, actLogout } from "../../actions/Auth";
import { Button } from "antd";

class Navbar extends React.Component {
  componentDidUpdate() {
    const { actGetUser } = this.props;
    actGetUser();
  }
  render() {
    const { username, status, strategy, actLogout } = this.props;
    let login,
      logout,
      register_learner,
      register_teacher,
      learner,
      teacher,
      teacher_list,
      update_info_register,
      contract_learner,
      contract_teacher,
      revenue;
    if (username && username !== undefined && status === "active") {
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

      if (strategy === "learner") {
        learner = (
          <Menu.Item key="learner">
            <Link to="/learner">Learner</Link>
          </Menu.Item>
        );
        teacher_list = (
          <Menu.Item key="teacher_list">
            <Link to="/teacher-list">Teacher page</Link>
          </Menu.Item>
        );
        contract_learner = (
          <Menu.Item key="contract_learner">
            <Link to="/contract-learner">Contract learner</Link>
          </Menu.Item>
        );
      } else if (strategy === "teacher") {
        teacher = (
          <Menu.Item key="teacher">
            <Link to="/teacher">Teacher</Link>
          </Menu.Item>
        );
        contract_teacher = (
          <Menu.Item key="contract_teacher">
            <Link to="/contract-teacher">Contract teacher</Link>
          </Menu.Item>
        );
        revenue = (
          <Menu.Item key="revenue">
            <Link to="/revenue">Revenue</Link>
          </Menu.Item>
        );
      }
    } else {
      teacher_list = (
        <Menu.Item key="teacher_list">
          <Link to="/teacher-list">Teacher page</Link>
        </Menu.Item>
      );
      login = (
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      );
      register_learner = (
        <Menu.Item key="register_learner">
          <Link to="/register-learner">Register For Learner</Link>
        </Menu.Item>
      );
      register_teacher = (
        <Menu.Item key="register_teacher">
          <Link to="/register-teacher">Register For Teacher</Link>
        </Menu.Item>
      );
    }
    return (
      <Menu mode="horizontal" className="navbar">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {teacher_list}
        {learner}
        {teacher}
        {contract_learner}
        {contract_teacher}
        {revenue}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
