import React from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

const Footer = () => {
  return (
    <Row className="footer">
      <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 4 }}>
        <div style={{ fontWeight: 200 }}>Project web</div>
        <div>Uber for tutor website</div>
      </Col>
      <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 4 }}>
        <div style={{ fontWeight: 200 }}>Members</div>
        <div>
          1612310 - Nguyễn Đăng Khởi
          <br />
          1612586 - Trương Hoài Tâm
        </div>
      </Col>
    </Row>
  );
};

export default Footer;
