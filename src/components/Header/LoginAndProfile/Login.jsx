import React, { useState } from 'react';
import { login, register } from '../../../api/login.js';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../store/user/userSlice.js';
import { getUserSearchHistory } from '../../../api/dbServices.js';

// material ui
import { Modal } from '../../Modal';

function processInput(input, label='none'){
  let result = input;
  switch(label){
  case 'username':
    result = input.match(/[a-z\d]*/ig).join('');
    break;
  case 'paccword':
    break;
  case 'mail':
    break;
  default:
    break;
  }
  return result;
}

const useField = (type, label, name) => {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    const input = event.target.value;
    const processedInput = processInput(input, label);
    setValue(processedInput);
  };
  name = name ? name : label;
  return{ type, label, name, value, onChange, setValue };
};

export function Login (props){
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(false);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  const dispatch = useDispatch();


  const username = useField('text', 'username');
  const mail = useField('text', 'mail');
  const password = useField('password', 'password');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Loggin in with', username.value, password.value);
    const user = await login({ username: username.value, password: password.value });
    console.log('user', user);
    if (user===undefined){
      return;
    }
    // window.localStorage.setItem(
    //   'loggedMDSearchUser', JSON.stringify(user)
    // );
    console.log('mail', mail);
    if (user){

      mail.setValue('');
      password.setValue('');
      username.setValue('');
      dispatch(update(user));
      getUserSearchHistory();
    }

  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Registration with:', 'username: ', username.value, 'mail: ',mail.value, 'password: ',password.value);
    const user = await register({ username: username.value, mail: mail.value, password: password.value });
    console.log('user', user);

    // window.localStorage.setItem(
    //   'loggedMDSearchUser', JSON.stringify(user)
    // );
    console.log('mail', mail);
    if (user){
      mail.setValue('');
      password.setValue('');
      username.setValue('');
      dispatch(update(user));
      getUserSearchHistory();
    }

  };


  const toggleMode = (event) => {
    setMode(!mode);
  };

  return(
    <div id='modalLogin'>
      <button className={'loginHeaderButton '+themeName} onClick={() => setIsOpen(true)}>
                Login
      </button>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <form onSubmit={handleLogin}>
          <div id='loginWrapper'>
            {mode &&
                        <div id='usernameWrapper'>
                          <input {...mail}/>
                        </div>}
            <div id='mail'>
              <input {...username}/>
            </div>
            <div id='passwordWrapper'>
              <input {...password}/>
            </div>
          </div>
          <div
            className='reglogButtons'
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {mode ?
              <button onClick={handleRegister}>{'register & login'}</button>
              :
              <button onClick={handleLogin}>login</button>
            }

            <button onClick={toggleMode}>{mode ? 'I have an account' : 'create account'}</button>
          </div>
        </form>
      </Modal>
    </div>

  );

}