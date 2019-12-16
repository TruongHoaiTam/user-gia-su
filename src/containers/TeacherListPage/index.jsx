import React from 'react';
import Teachers from '../../components/Teachers';
import './style.css';

class TeacherListPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/teacher-detail');
  };

  render() {
    return (
      <div className="center">
        <Teachers history={() => this.history()} />
      </div>
    );
  }
}

export default TeacherListPage;
