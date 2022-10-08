import React, { useState } from 'react';
import {login, register} from '../services/login.js';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove } from '../features/user/userSlice.js'
import {getUserSearchHistory} from '../services/dbServices.js'

// material ui
import { TextField, Button, Box } from '@mui/material';
import Modal from './Modal/Modal.js';

function processInput(input, label='none'){
    let result = input
    switch(label){
        case 'username':
            result = input.match(/[a-z\d]*/ig).join('');
            break
        case 'paccword':
            break
        case 'mail':
            break
        default:
            break
    }
    return result
}

export function Login (props){
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState(false);
    const [user, setUser] = useState(null);

    const dispatch = useDispatch()

    const useField = (type, label, name)=>{
        const [value, setValue] = useState('');
        const onChange = (event)=>{
            const input = event.target.value;
            const processedInput = processInput(input, label)
            setValue(processedInput)
        }
        name = name ? name : label
        return{type, label, name, value, onChange}
    }
    const username = useField('text', 'username')
    const mail = useField('text', 'mail')
    const password = useField('password', 'password')

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

            mail.setValue('')
            password.setValue('')
            username.setValue('')
            dispatch(update(user)); 
            getUserSearchHistory();
        }

    }

    const handleRegister = async (event) =>{
        event.preventDefault();
        console.log("Registratiom with", username, mail, password)
        const user = await register({username, mail, password});
        console.log("user", user);
        window.localStorage.setItem(
            'loggedMDSearchUser', JSON.stringify(user)
            );
        if (user){
            mail.setValue('')
            password.setValue('')
            username.setValue('')
            dispatch(update(user)); 
            getUserSearchHistory();
        }

    }


    const toggleMode = (event) => {
        setMode(!mode)
    }
    
    return(
        <div id='modalLogin'>
                <Button  variant="contained" color="secondary" onClick={() => setIsOpen(true)}>
                Login
                </Button>

                <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                <form onSubmit={handleLogin}>
                    <div id='loginWrapper'>
                        {mode && 
                        <div id='usernameWrapper'>
                            <TextField {...mail} />
                        </div>}
                        <div id='mail'>
                            <TextField {...username} />
                        </div>
                        <div id='passwordWrapper'>
                            <TextField {...password} />
                        </div>
                    </div>
                    <Box 
                        className='reglogButtons'
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >   
                        {mode ? 
                        <Button variant="contained" color="primary" sx={{width: '114px'}} onClick={handleRegister}>{'register & login'}</Button>
                        :
                        <Button variant="contained" color="primary" sx={{width: '114px'}} onClick={handleLogin}>login</Button>
                        }
                        
                        <Button color="iconButton" sx={{width: '114px'}} onClick={toggleMode}>{mode ? 'I have an account' : 'create account'}</Button>
                    </Box>
                </form>
                </Modal>
            </div>
        
    )

}