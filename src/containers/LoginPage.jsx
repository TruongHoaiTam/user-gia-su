import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginFacebookGoogle from '../components/LoginFacebookGoogle';

function LoginPage() {
  localStorage.setItem('imageUrl', undefined);
  return (
    <div>
      <p className="title">LOGIN</p>
      <LoginForm />
      <LoginFacebookGoogle />
    </div>
  );
}

export default LoginPage;
