import styles from './Navigation.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

//material ui
import { Button } from '@mui/material';

const locations = [
  {
    pathname: '/',
    name: 'main'
  },
  {
    pathname: 'about',
    name: 'about'  
  }
]



export function Navigation() {
  const navigate = useNavigate();
  const [buttons, setButtons] = useState()
  const shouldUseEffect=useRef(true);
  const location=useLocation();

  useEffect(()=>{
    if (shouldUseEffect.current){
      const elements = locationsElements()
      setButtons(elements)
      console.log("elements", elements);
    }

  }, [location])

  function navigateTo(location){
    navigate(location, { replace: true })
  }

  const locationsElements = function(){
    const result = locations.map((element)=>{
      const loc = location.pathname.replaceAll('/', '');
      const path = element.pathname.replaceAll('/', '');
      if(loc!==path){
        console.log("location.pathname", location.pathname);
        console.log("element.pathname", element.pathname);
        console.log("location.pathname!==element.pathname", location.pathname!==element.pathname);
        return(
          <Button variant="contained" color="primary" key={element.name} onClick={()=>navigateTo(element.pathname)}>{element.name}</Button>
        )
      }
    })
    return result
  }

  return(
    <div className='navigationWrapper'>
      {buttons}
    </div>
  )
}
