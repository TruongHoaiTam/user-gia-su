import React from 'react';
import { Comment, Icon, Tooltip, Rate } from 'antd';
import moment from 'moment';
import './style.css';

class MyComment extends React.Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null,
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  render() {
    const { likes, dislikes, action } = this.state;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
      <Comment
        actions={actions}
<<<<<<< HEAD
        author={<p class="job">Task</p>}
=======
        author={<a class="job">Task</a>}
>>>>>>> 7afe7210f57073b897336c43a7b8f742112476a3
        
        content={
          <div>
            <Rate disabled defaultValue={4} className="rating" />
            <p class="italic">
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure), to help people create their product prototypes beautifully
              and efficiently.
            </p>
          </div>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}

export default MyComment;