import React from 'react';
import 'antd/dist/antd.css';
import './style.css';

import { Select, Card } from 'antd';
const { Option } = Select;

const Filter = () => {

  // placeholder select
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  // default select
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Card className="filter-teacher">
      <div className="filter">
        <span>Lọc:</span>
        <Select className="ml-16"
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn địa điểm"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Thành phố Hồ Chí Minh</Option>
          <Option value="lucy">Thủ đô Hà Nội</Option>
          <Option value="tom">Đà Nẵng</Option>
        </Select>
        <Select className="ml-16"
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn mức lương trên giờ"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">100 nghìn/giờ</Option>
          <Option value="lucy">50 nghìn/giờ</Option>
          <Option value="tom">200 nghìn/giờ</Option>
        </Select>
      </div>
      <div className="sort">
        <span className="mr-16">Sắp xếp</span>
        <Select defaultValue="incSal" style={{ width: 120 }} onChange={handleChange}>
        <Option value="incSal">Giá tăng dần</Option>
        <Option value="decSal">Giá giảm dần</Option>
      </Select>
      </div>
    </Card>
  );
};

export default Filter;
