import { useSelector, useDispatch } from 'react-redux';
import { login, register } from '../../../api/login.js';
import { update as updateUser } from '../../../store/user/userSlice';
import { getUserSearchHistory } from '../../../api/dbServices.js';
import { useField } from '../../../hooks/useField';
import { RootState } from '../../../store/storeTypes';
import React, { useState, FormEvent } from 'react';
import { Modal } from '../../Modal';
import { FormInput } from './FormInput';

export function LoginAndRegister (){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const dispatch = useDispatch();
  const themeName = useSelector((state: RootState) => state.parameters.ui.themeCC);

  const usernameField = useField('text', 'username');
  const mailField = useField('text', 'mail');
  const passwordField = useField('text', 'password');



  const handleLoginAndRegistration = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoginMode){
      loginUser();
    }
    else if(!isLoginMode){
      registerUser();
    }
  };

  const loginUser = async () => {
    console.log('Loggin in with', usernameField.value, passwordField.value);
    const user = await login({ username: usernameField.value, password: passwordField.value });
    console.log('user', user);
    if (!user){return;}
    dispatch(updateUser(user));
    getUserSearchHistory();
    mailField.setValue('');
    passwordField.setValue('');
    usernameField.setValue('');
  };

  const registerUser = async () => {
    console.log('Registration with:', 'username: ', usernameField.value, 'mail: ', mailField.value, 'password: ', passwordField.value);
    const user = await register({ username: usernameField.value, mail: mailField.value, passwordField: passwordField.value });
    if (!user){return;}
    dispatch(updateUser(user));
    getUserSearchHistory();
    mailField.setValue('');
    passwordField.setValue('');
    usernameField.setValue('');
  };

  return (
    <div>
      <button className={'loginHeaderButton '+themeName} onClick={() => setIsModalOpen(true)}>
                Login
      </button>

      <Modal handleClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <form onSubmit={handleLoginAndRegistration}>
          <div>
            {!isLoginMode &&
                <div>
                  <p>Mail</p>
                  <input {...mailField.field}/>
                </div>
            }
            <div>
              <p>Username</p>
              <input {...usernameField.field}/>
            </div>
            <div>
              <p>Password</p>
              <input {...passwordField.field}/>
              <FormInput inputData={passwordField.field.value} dataType={'password'}/>
            </div>
          </div>

          <div>
            <button type="submit">
              {isLoginMode? 'login': 'register & login'}
            </button>
            <button onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode? 'create new account' : 'I have an account'}
            </button>
          </div>
        </form>


      </Modal>
    </div>
  );
}