import React from 'react';
import RegisterForm from '../components/RegisterForm';

class RegisterLearnerPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/login');
  };
  render() {
    return (
      <div>
        <p className="title">REGISTER FOR LEARNER</p>
        <RegisterForm history={this.history} />
      </div>
    );
  }
}

export default RegisterLearnerPage;
