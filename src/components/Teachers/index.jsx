import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Card, Tag, Button, Select } from 'antd';
import {
  callApiGetAllTeacher,
  callApiGetFilterTeacher,
  callApiGetAllTag
} from '../../utils/apiCaller';
import { connect } from 'react-redux';
import { actSetCurrentTeacher } from '../../actions/Detail';
const { Option } = Select;

class Teachers extends React.Component {
  state = {
    data: [],
    all_tags: [],
    valueAddress: undefined,
    valuePrice: undefined,
    valueSubject: undefined
  };

  componentWillMount() {
    callApiGetAllTeacher().then(resultTeacher => {
      callApiGetAllTag().then(resultTag => {
        let tags = [];
        resultTag.data.forEach(item => {
          tags.push(item.tag);
        });
        this.setState({
          data: resultTeacher.data,
          all_tags: tags
        });
      });
    });
  }

  onChangeAddress = value => {
    const { valuePrice, valueSubject } = this.state;
    const values = {
      valueAddress: value,
      valuePrice,
      valueSubject
    };
    callApiGetFilterTeacher(values).then(result => {
      this.setState({ valueAddress: value, data: result.data });
    });
  };

  onChangePrice = value => {
    const { valueAddress, valueSubject } = this.state;
    const values = {
      valueAddress,
      valuePrice: value,
      valueSubject
    };
    callApiGetFilterTeacher(values).then(result => {
      this.setState({ valuePrice: value, data: result.data });
    });
  };

  onChangeSubject = value => {
    const { valueAddress, valuePrice } = this.state;
    const values = {
      valueAddress,
      valuePrice,
      valueSubject: value
    };
    callApiGetFilterTeacher(values).then(result => {
      this.setState({ valueSubject: value, data: result.data });
    });
  };

  handleClick = item => {
    const { actSetCurrentTeacher } = this.props;
    actSetCurrentTeacher(item);
    const { history } = this.props;
    history();
  };

  render() {
    const { all_tags, data } = this.state;

    let cards = data.map((item, index) => (
      <Card key={index} className="usercard">
        <div className="info-avatar">
          <div className="avatar-container">
            <img className="avatar" src={item.avatar} alt="avatar"></img>
          </div>
          <div className="short-info">
            <p>Họ và tên: {item.fullname}</p>
            <div className="flex">
              <p>Giá/giờ: {item.price_per_hour}</p>
              <p>Địa điểm: {item.teaching_address}</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="tags">
            {item.tags.map((i, pos) => (
              <Tag key={pos}>{i}</Tag>
            ))}
          </div>
          <Button type="primary" onClick={() => this.handleClick(item)}>
            Xem chi tiết
          </Button>
        </div>
      </Card>
    ));

    return (
      <div>
        <Card className="filter-teacher">
          <div className="filter">
            <span>Lọc:</span>
            <Select
              className="ml-16"
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn địa điểm học"
              optionFilterProp="teaching_address"
              onChange={this.onChangeAddress}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="TPHCM">TPHCM</Option>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
            <Select
              className="ml-16"
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn giá trên giờ"
              optionFilterProp="price-per-hour"
              onChange={this.onChangePrice}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="<20000">Dưới 20000 đ/giờ</Option>
              <Option value="20000-40000">20000 đ/giờ - 40000 đ/giờ</Option>
              <Option value=">40000">Trên 40000 đ/giờ</Option>
            </Select>
            <Select
              className="ml-16"
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn môn học"
              optionFilterProp="subject"
              onChange={this.onChangeSubject}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {all_tags.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </Card>
        {cards}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_teacher: state.detail.current_teacher
});

const mapDispatchToProps = dispatch => ({
  actSetCurrentTeacher: current_teacher =>
    dispatch(actSetCurrentTeacher(current_teacher))
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
