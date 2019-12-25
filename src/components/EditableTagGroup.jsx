import React from 'react';
import 'antd/dist/antd.css';
import { Tag, Icon, Dropdown, Button, Menu } from 'antd';
import { connect } from 'react-redux';
import { TweenOneGroup } from 'rc-tween-one';
import { callApiGetAllTag } from '../utils/apiCaller';
import {
  actLoginRequest,
  actGetUser,
  actLogout,
  actSaveIntroduction
} from '../actions/Auth';

class EditableTagGroup extends React.Component {
  state = {
    tags_display: [],
    inputVisible: false
  };

  handleMenuClick = e => {
    this.handleConfirm(e.item.props.children);
  };

  handleClose = removedTag => {
    const tags_display = this.state.tags_display.filter(
      tag => tag !== removedTag
    );
    localStorage.setItem('tags_display', tags_display);
    this.setState({ tags_display });
  };

  handleConfirm = inputValue => {
    let { tags_display } = this.state;
    if (inputValue && tags_display.indexOf(inputValue) === -1) {
      tags_display = [...tags_display, inputValue];
    }
    localStorage.setItem('tags_display', tags_display);

    this.setState({
      tags_display,
      inputVisible: false
    });
  };

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  componentWillMount() {
    callApiGetAllTag().then(result => {
      console.log(result);
      let data = [];
      result.data.forEach(item => {
        data.push({
          tag: item.tag
        });
      });
      const { actSaveIntroduction } = this.props;
      actSaveIntroduction({ all_tags: data });
    });
    const { tags } = this.props;
    this.setState({
      tags_display: tags.split(',')
    });
  }

  render() {
    const { tags_display } = this.state;
    const { all_tags } = this.props;

    const tagChild = tags_display.map(this.forMap);

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {all_tags.map((item, index) => (
          <Menu.Item key={index}>{item.tag}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
            onComplete: e => {
              e.target.style = '';
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
        <Dropdown overlay={menu}>
          <Button>
            Kỹ Năng <Icon type="down" />
          </Button>
        </Dropdown>
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

  all_tags: state.auth.all_tags,

  introduce: state.auth.introduce,
  teaching_address: state.auth.teaching_address,
  price_per_hour: state.auth.price_per_hour
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout()),

  actSaveIntroduction: info => dispatch(actSaveIntroduction(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableTagGroup);
