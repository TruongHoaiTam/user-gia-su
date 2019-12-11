import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Tag, Button } from 'antd';

const UserCard = () => {

  return (
    <Card className="usercard">
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
        <div className="tags">
          <Tag>Coding</Tag>
          <Tag>M. Excel</Tag>
          <Tag>M. Word</Tag>
        </div>
        <p className="des">Description...</p>
        <Button type="primary">Xem thêm</Button>
      </div>
    </Card>
  );
};

export default UserCard;
