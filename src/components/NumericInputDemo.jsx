import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Input } from 'antd';

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder="Nhập giá/giờ"
        maxLength={10}
        minLength={1}
      />
    );
  }
}

class NumericInputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChange = value => {
    localStorage.price_per_hour = value;
    this.setState({ value });
  };

  componentWillMount() {
    const { price_per_hour } = this.props;
    this.setState({
      value: price_per_hour === undefined ? '' : price_per_hour
    });
  }

  render() {
    return (
      <NumericInput
        style={{ width: 240 }}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default NumericInputDemo;
