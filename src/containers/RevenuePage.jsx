import React from "react";
import { Statistic, Row, Col, Icon, Card } from "antd";
import { callApiCountLearnerAndRevenue } from "../utils/apiCaller";
import { connect } from "react-redux";

class RevenuePage extends React.Component {
  state = {
    count: 0,
    revenue: 0 + "VND"
  };

  componentWillMount() {
    const { _id } = this.props;
    callApiCountLearnerAndRevenue(_id).then(result => {
      this.setState({
        count: result.data.count,
        revenue: result.data.revenue
      });
    });
  }

  render() {
    return (
      <div>
        <Card className="card-group" title="Thống kê doanh thu">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Number of learner"
                value={this.state.count}
                prefix={<Icon type="user" />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total revenue"
                value={this.state.revenue}
                prefix={<Icon type="money-collect" />}
              />
            </Col>
          </Row>
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

  err: state.auth.err
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePage);
