import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Rate, Tag, Button } from 'antd';
import MyComment from '../MyComment/index';

const UserDetail = () => {

  return (
    <div>
      <Card className="userCard">
        <div class="info-avatar">
          <div class="avatar-container">
            <img class="avatar" src="https://via.placeholder.com/150" alt="avatar"></img>
          </div>
          <div class="short-info">
            <p>This is user name</p>
            <span>Location</span>
          </div>
        </div>
        <div class="content">
          <div class="flex">
            <p>
              <b class="highlight">100,000vnd</b><br />
              <span>Trên giờ</span>
            </p>
            <p>
              <b class="highlight">5,000,000vnd</b><br />
              <span>Cho đến bây giờ</span>
            </p>
            <p>
              <b class="highlight">20</b><br />
              <span>Công việc</span>
            </p>
          </div>
          <p class="highlight">Job</p>
          <p class="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, totam mollitia? Doloremque qui totam natus corporis in inventore assumenda ut exercitationem placeat culpa nisi repudiandae dolorum asperiores ea, veniam expedita!</p>
          <div>
            <b class="mr-16">Đánh giá trung bình</b>
            <Rate disabled defaultValue={4.5} className="rating" />
          </div>
          <br />
          <Button type="primary">Liên hệ</Button>
        </div>
      </Card>
      
      <Card className="card-group" title="Lịch sử làm việc">
        <MyComment></MyComment>
        <MyComment></MyComment>
        <MyComment></MyComment>
      </Card>

      <Card className="card-group" title="Kĩ năng">
        <div className="tags">
          <Tag>Coding</Tag>
          <Tag>M. Excel</Tag>
          <Tag>M. Word</Tag>
        </div>
      </Card>
    </div>
  );
};

export default UserDetail;
