import React from 'react';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

class RegisterTeacherPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/login');
  };
  render() {
    return (
      <div>
        <Navbar />
        <p className="title">REGISTER FOR TEACHER</p>
        <RegisterForm history={this.history} />
      </div>
    );
  }
}

export default RegisterTeacherPage;
