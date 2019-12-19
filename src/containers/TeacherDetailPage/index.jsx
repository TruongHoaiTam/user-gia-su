import React from 'react';
import TeacherDetail from '../../components/TeacherDetail';
import './style.css';

class TeacherDetailPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/contract');
  };
  render() {
    return (
      <div className="center">
        <TeacherDetail history={() => this.history()}></TeacherDetail>
      </div>
    );
  }
}

export default TeacherDetailPage;
