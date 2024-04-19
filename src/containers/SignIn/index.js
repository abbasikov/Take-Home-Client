/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Input, Button, message } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SignInWrapper } from './style';
import Logo from '../../static/assets/React_Logo.jpeg';

import { SetState, SignIn } from '../../redux/slices/auth-slice';

const { Password } = Input;

function SignInComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const sendSignInRequest = () => {
    const userData = { email, password };
    return dispatch(SignIn(userData));
  };

  return (
    <SignInWrapper>
      <div className="signin-container">
        <div className="signin-box">
          <div className="logo">
            <img src={Logo} alt="" width="80" />
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
          <Button loading={loading} onClick={sendSignInRequest} className="submit-button" type="primary">
            Sign In
          </Button>
          <div className="footer-links">
            <span
              onClick={() => {
                history.push('/non-auth/register');
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </SignInWrapper>
  );
}

export default SignInComponent;
