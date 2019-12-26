import React from "react";
import { Button } from "antd";

function HomePage() {
  return (
    <div className="home">
      <div className="heading-box">
        <h3 className="heading-primary">
          <span className="heading-primary__main">Uber for tutor</span>
          <span className="heading-primary__sub">
            kết nối người dạy và người học
          </span>
        </h3>
        <div className="heading-btn">
          <Button type="secondary">Tìm thầy</Button>
          <Button type="secondary">Tìm trò</Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
