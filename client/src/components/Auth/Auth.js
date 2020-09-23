import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';

import './Auth.scss';
import AuthContext from '../../contexts/auth-context';
import Modal from '../Modal';

const Auth = (props) => {
  const emailEl = useRef();
  const nameEl = useRef();
  const passwordEl = useRef();
  const password2El = useRef();

  const [isSignup, setIsSignup] = useState(props.signup);
  const [isLogin, setIsLogin] = useState(props.login);

  const { login } = useContext(AuthContext);

  const handleSignup = (e) => {
    e.preventDefault();

    let requestData;
    if (login) {
      const name = nameEl.current.value;
      const password = passwordEl.current.value;

      if (name.trim().length === 0 || password.trim().length === 0) {
        return;
      }

      requestData = {
        query: `
          query {
            login(name: "${name}", password:"${password}") {
              user_id
              token
              token_expiration
            }
          }
        `,
      };
    } else {
      const email = emailEl.current.value;
      const name = nameEl.current.value;
      const password = passwordEl.current.value;
      const password2 = password2El.current.value;

      if (
        email.trim().length === 0 ||
        name.trim().length === 0 ||
        password.trim().length === 0 ||
        password2.trim().length === 0 ||
        password !== password2
      ) {
        return;
      }

      requestData = {
        query: `
        mutation {
          createUser(userInput:{email:"${email}", name:"${name}", password:"${password}"}) {
            _id
            email
          }
        }
      `,
      };
    }

    axios
      .post('http://localhost:5000/graphql', requestData)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        console.log(res.data.data);
        if (res.data.data.login.token) {
          login(
            res.data.data.login.user_id,
            res.data.data.login.token,
            res.data.data.login.token_expiration
          );
        }
        // closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const header = () => {
    return (
      <header>
        <span className='title'>Sign up</span>
        <span className='text'>
          By continuing, you agree to our{' '}
          <span className='blue'>User Agreement</span> and{' '}
          <span className='blue'>Privacy Policy</span>
        </span>
      </header>
    );
  };

  const modalContent = () => {
    return (
      <>
        <div className='art' />
        {isSignup ? (
          <form>
            {header()}
            <div className='form-control'>
              <input type='text' ref={emailEl} required />
              <label>EMAIL</label>
            </div>
            <div className='form-control'>
              <input type='text' ref={nameEl} required />
              <label>CHOOSE A USERNAME</label>
            </div>
            <div className='form-control'>
              <input type='password' ref={passwordEl} required />
              <label>PASSWORD</label>
            </div>
            <div className='form-control'>
              <input type='password' ref={password2El} required />
              <label>RE-ENTER PASSWORD</label>
            </div>
            <div className='form-actions'>
              <div className='btn' onClick={handleSignup}>
                SIGN UP
              </div>
            </div>
          </form>
        ) : null}
        {isLogin ? (
          <form>
            {header()}
            <div className='form-control'>
              <input type='text' ref={nameEl} required />
              <label>USERNAME</label>
            </div>
            <div className='form-control'>
              <input type='password' ref={passwordEl} required />
              <label>PASSWORD</label>
            </div>
            <div className='form-actions'>
              <div className='btn' onClick={handleSignup}>
                LOG IN
              </div>
            </div>
            <span className='text'>
              Forgot your <span className='blue'>username</span> or{' '}
              <span className='blue'>password</span>?
            </span>
            <span className='text'>
              New to Reddit?{' '}
              <span
                className='blue-bold'
                onClick={() => {
                  setIsLogin(false);
                  setIsSignup(true);
                }}
              >
                SIGN UP
              </span>
            </span>
          </form>
        ) : null}
      </>
    );
  };

  return (
    <Modal
      triggerText={props.signup ? 'SIGN UP' : 'LOGIN'}
      modalContent={modalContent()}
      triggerStyle={props.signup ? 'primary' : 'primary-inverted'}
      modalStyle='auth-modal'
      close
    ></Modal>
  );
};

export default Auth;
