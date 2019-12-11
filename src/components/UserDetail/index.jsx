import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Button } from 'antd';

const UserDetail = () => {

  return (
    <Card className="userDetail">
      <div class="info-avatar">
        <div class="avatar-container">
          <img class="avatar" src="https://via.placeholder.com/150" alt="avatar"></img>
        </div>
        <div class="short-info">
          <p>This is user name</p>
          <p>Job</p>
          <div class="flex">
            <p>Salary</p>
            <p>Location</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="flex">
          <p>
            <b>100,000vnd</b><br />
            <span>Trên giờ</span>
          </p>
          <p>
            <b>5,000,000vnd</b><br />
            <span>Cho đến bây giờ</span>
          </p>
          <p>
            <b>20</b><br />
            <span>Công việc</span>
          </p>
        </div>
        <p className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, totam mollitia? Doloremque qui totam natus corporis in inventore assumenda ut exercitationem placeat culpa nisi repudiandae dolorum asperiores ea, veniam expedita!</p>
        <Button type="primary">Xem thêm</Button>
      </div>
    </Card>
  );
};

export default UserDetail;
