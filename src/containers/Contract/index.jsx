import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Tag, Button } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actSetCurrentTeacher } from '../../actions/Detail';
import {
  callApiAddContractUser,
  callApiAddContractAdmin
} from '../../utils/apiCaller';

class ContractPage extends React.Component {
  handleClick = (current_learner, current_teacher, content) => {
    const contract = {
      id: new Date().getTime(),
      current_learner: {
        _id: current_learner._id,
        fullname: current_learner.fullname,
        phone: current_learner.phone,
        birthday: current_learner.birthday,
        address: current_learner.address,
        email: current_learner.email,
        avatar: current_learner.avatar
      },
      current_teacher: {
        _id: current_teacher._id,
        fullname: current_teacher.fullname,
        phone: current_teacher.phone,
        birthday: current_teacher.birthday,
        address: current_teacher.address,
        email: current_teacher.email,
        avatar: current_teacher.avatar
      },
      content
    };
    callApiAddContractAdmin(contract).then(() => {
      callApiAddContractUser(contract).then(() => {
        const { history } = this.props;
        history.push('/teacher-list');
      });
    });
  };

  render() {
    const {
      current_teacher,
      _id,
      username,
      avatar,
      fullname,
      phone,
      email,
      birthday,
      address,
      status,
      strategy
    } = this.props;
    const current_learner = {
      _id,
      username,
      avatar,
      fullname,
      phone,
      email,
      birthday,
      address
    };
    const content = {
      price_per_hour: current_teacher.price_per_hour,
      teaching_address: current_teacher.teaching_address,
      tags: current_teacher.tags
    };
    if (
      username &&
      username !== undefined &&
      status === 'active' &&
      strategy === 'learner'
    ) {
      return (
        <div className="center">
          <p className="title">CONTRACT</p>
          <Card style={{ height: 200 }}>
            <div className="info-avatar">
              <div className="avatar-container">
                <b>Người dạy: </b>
                <img
                  className="avatar"
                  src={current_teacher.avatar}
                  alt="avatar"
                ></img>
              </div>
              <div className="short-info">
                <h2>{current_teacher.fullname}</h2>
                <p>
                  <b>Email: </b>
                  {current_teacher.email}
                </p>
                <p>
                  <b>SĐT: </b>
                  {current_teacher.phone}
                </p>
                <p>
                  <b>Ngày sinh: </b>
                  {current_teacher.birthday.slice(0, 10)}
                </p>
                <p>
                  <b>Địa chỉ: </b>
                  {current_teacher.address}
                </p>
              </div>
            </div>
          </Card>
          <Card style={{ height: 200 }}>
            <div className="info-avatar">
              <div className="avatar-container">
                <b>Người học: </b>
                <img className="avatar" src={avatar} alt="avatar"></img>
              </div>
              <div className="short-info">
                <h2>{fullname}</h2>
                <p>
                  <b>Email: </b>
                  {email}
                </p>
                <p>
                  <b>SĐT: </b>
                  {phone}
                </p>
                <p>
                  <b>Ngày sinh: </b>
                  {birthday.slice(0, 10)}
                </p>
                <p>
                  <b>Địa chỉ: </b>
                  {address}
                </p>
              </div>
            </div>
          </Card>
          <Card style={{ height: 500 }}>
            <div className="content">
              <div className="flex">
                <p>
                  <b>Giá thuê: </b> {current_teacher.price_per_hour} VND/giờ
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Số giờ thuê: </b> 50 giờ
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Tổng học phí: </b> {current_teacher.price_per_hour * 50}{' '}
                  VND
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Khoảng thời gian học: </b> 19h-21h Thứ 2-4-6 hàng tuần
                </p>
              </div>
              <div className="flex">
                <p>
                  <b>Địa chỉ dạy: </b> {current_teacher.teaching_address}
                </p>
              </div>
              <div className="flex">
                <b>Môn học: </b>
                <div className="tags">
                  {current_teacher.tags.map((item, index) => (
                    <Tag key={index}>{item}</Tag>
                  ))}
                </div>
              </div>
              <br />
              <Button
                type="primary"
                onClick={() =>
                  this.handleClick(current_learner, current_teacher, content)
                }
              >
                Đăng ký học
              </Button>
            </div>
          </Card>
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

  err: state.auth.err,

  introduce: state.auth.introduce,
  teaching_address: state.auth.teaching_address,
  price_per_hour: state.auth.price_per_hour,
  tags: state.auth.tags,

  current_teacher: state.detail.current_teacher
});

const mapDispatchToProps = dispatch => ({
  actSetCurrentTeacher: current_teacher =>
    dispatch(actSetCurrentTeacher(current_teacher))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractPage);
