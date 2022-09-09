import './header.css'
import { useDispatch, useSelector } from 'react-redux';
import { update, remove} from '../../features/user/userSlice.js';
import {useState, useEffect} from 'react';
import {SearchField} from '../SearchField.js';
import {Togglable} from '../Togglable.js';
import { SearchHistory } from "../SearchHistory.js";
import {getUserSearchHistory} from '../../services/dbServices.js';
import { LoginAndProfile } from '../LoginAndProfile.js';
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"

//modern ui
import { AppBar } from '@mui/material';

export function  Header(){
    const [urbanDef, setUrbanDef] = useState('');
    const [loginVisible, setLoginVisible] = useState(false)
  
    const updateUrbanState = (data)=>{setUrbanDef(data)};
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    useEffect(()=>{
        const loggedUserJSON = window.localStorage.getItem('loggedMDSearchUser');
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          dispatch((update(user)))
        }  }, [])

    return(
        <AppBar>
        <div className='header'>
            <SearchField setUrbanDef={updateUrbanState}/>
            <div>
            <Togglable turnOn='show history!' turnOff1='hide history' onTurnOnFunction={getUserSearchHistory}>
                <SearchHistory/>
            </Togglable>
            </div>
            <div id='navigation'>
                <Link to="/">main</Link>
                <Link to="about">about</Link>
            </div>
            <div>
                Parametres
            </div>
            <div id='loginAndProfileWrapper'>
                <LoginAndProfile/>
            </div>
        </div>
        </AppBar>
    )   
}