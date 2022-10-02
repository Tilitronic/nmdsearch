import React, { useState } from 'react';
import {login, register} from '../services/login.js';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove } from '../features/user/userSlice.js'
import {getUserSearchHistory} from '../services/dbServices.js'

// material ui
import { TextField, Button, Box } from '@mui/material';
import Modal from './Modal/Modal.js';

export function Login (props){
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [user, setUser] = useState(null);

    const dispatch = useDispatch()

    const handleLogin = async (event) =>{
        event.preventDefault();
        console.log("Loggin in with", username, password)
        const user = await login({username, password});
        console.log("user", user);
        if (user===undefined){
            return
        }
        window.localStorage.setItem(
            'loggedMDSearchUser', JSON.stringify(user)
            );
        if (user){
            // setUser(userData);
            setUsername('');
            setPassword('');
            dispatch(update(user)); //check without brakes
            getUserSearchHistory();
        }

    }

    const handleRegister = async (event) =>{
        event.preventDefault();
        console.log("Registratiom with", username, password)
        const user = await register({username, password});
        console.log("user", user);
        window.localStorage.setItem(
            'loggedMDSearchUser', JSON.stringify(user)
            );
        if (user){
            // setUser(userData);
            setUsername('');
            setPassword('');
            dispatch(update(user)); //check without brakes
            getUserSearchHistory();
        }

    }

    const handleUsernameChange = (event) => {
        const input = event.target.value;
        const username = input.match(/[a-z\d]*/ig).join('');
        setUsername(username);
    }

    
    return(
        <div id='modalLogin'>
                <Button  variant="contained" color="secondary" onClick={() => setIsOpen(true)}>
                Login
                </Button>

                <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                <form onSubmit={handleLogin}>
                    <div id='loginWrapper'>
                        <div id='usernameWrapper'>
                            <TextField 
                            type="text"
                            value={username}
                            label="username"
                            name="Username"
                            onChange={handleUsernameChange}
                            />
                        </div>
                        <div id='passwordWrapper'>
                            <TextField 
                            type="password"
                            label="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                    </div>
                    <Box 
                        className='reglogButtons'
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button variant="contained" color="primary" sx={{width: '114px'}} onClick={handleLogin}>login</Button>
                        <Button color="secondary" sx={{width: '114px'}} onClick={handleRegister}>create account</Button>
                    </Box>
                </form>
                </Modal>
            </div>
        
    )

}