import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Rate, Tag, Button } from 'antd';
import MyComment from '../MyComment/index';
import { connect } from 'react-redux';
import { actSetCurrentTeacher } from '../../actions/Detail';

class TeacherDetail extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history();
  };

  render() {
    const { current_teacher, username, strategy, status } = this.props;

    let submit;
    if (
      username &&
      username !== undefined &&
      status === 'active' &&
      strategy === 'learner'
    ) {
      submit = (
        <Button type="primary" onClick={() => this.handleClick()}>
          Xem hợp đồng
        </Button>
      );
    }
    return (
      <div>
        <Card style={{ height: 200 }}>
          <div className="info-avatar">
            <div className="avatar-container">
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
        <Card style={{ height: 500 }}>
          <div className="content">
            <div className="flex">
              <p>
                <b>Học phí: </b> {current_teacher.price_per_hour} VND/giờ
              </p>
            </div>
            <div className="flex">
              <p>
                <b>Địa chỉ dạy: </b> {current_teacher.teaching_address}
              </p>
            </div>
            <div className="flex">
              <b>Kỹ năng: </b>
              <div className="tags">
                {current_teacher.tags.map((item, index) => (
                  <Tag key={index}>{item}</Tag>
                ))}
              </div>
            </div>
            <p className="des">
              <b>Giới thiệu: </b>
              {current_teacher.introduce}
            </p>
            <div>
              <b className="mr-16">Đánh giá trung bình</b>
              <Rate disabled defaultValue={4.5} className="rating" />
            </div>
            <br />
            {submit}
          </div>
        </Card>

        <Card className="card-group" title="Lịch sử làm việc">
          <MyComment></MyComment>
          <MyComment></MyComment>
          <MyComment></MyComment>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetail);
