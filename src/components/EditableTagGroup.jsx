import React from 'react';
import 'antd/dist/antd.css';
import { Tag, Icon, Dropdown, Button, Menu } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false
  };

  handleMenuClick = e => {
    console.log('click:', e.item.props.children[1]);
    this.handleConfirm(e.item.props.children[1]);
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  handleConfirm = inputValue => {
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    localStorage.tags = tags;

    this.setState({
      tags,
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

  render() {
    const { tags } = this.state;
    const tagChild = tags.map(this.forMap);

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          3rd item
        </Menu.Item>
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

export default EditableTagGroup;
