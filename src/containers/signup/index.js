/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logo from '../../static/assets/React_Logo.jpeg';

import { SignUpWrapper } from './style';

import { SetState, SignUp } from '../../redux/slices/auth-slice';

const { Password } = Input;

const SignUpComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, success, err } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (success) {
      dispatch(SetState({ field: 'success', value: false }));
      return history.push('/home');
    }
    if (err) {
      dispatch(SetState({ field: 'err', value: false }));
      return message.error(err);
    }
  }, [success, err]);

  const registerUser = () => {
    if (password !== confirmPassword) return message.error('Passwords Are Not Same');
    const userData = { name, email, password };
    return dispatch(SignUp(userData));
  };

  return (
    <>
      <SignUpWrapper>
        <div className="signin-container">
          <div className="signin-box">
            <div className="logo">
              <img src={Logo} alt="" width="80" />
            </div>
            <div className="form-item">
              <label htmlFor="email">Full Name:</label>
              <Input
                value={name}
                onChange={event => {
                  setName(event.target.value);
                }}
                placeholder="Enter Name"
                type="text"
                id="Name"
                name="Name"
              />
            </div>
            <div className="form-item">
              <label htmlFor="email">Email:</label>
              <Input
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }}
                placeholder="Enter Email"
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password:</label>
              <Password
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                }}
                placeholder="Enter Password"
                id="password"
                name="password"
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Confirm Password:</label>
              <Password
                value={confirmPassword}
                onChange={event => {
                  setConfirmPassword(event.target.value);
                }}
                placeholder="Confirm Password"
                id="password"
                name="password"
              />
            </div>
            <Button
              loading={loading}
              onClick={registerUser}
              disabled={!name || !email || !password || !confirmPassword}
              className="submit-button"
              type="primary"
            >
              Register
            </Button>
            <div className="footer-links">
              <span
                onClick={() => {
                  history.push('/auth/sign-in');
                }}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </SignUpWrapper>
    </>
  );
};

export default SignUpComponent;
