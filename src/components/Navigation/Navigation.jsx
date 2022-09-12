import styles from './Navigation.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"




export function Navigation() {

  return(
    <div className='navigationWrapper'>
      <Link to="/">main</Link>
      <Link to="about">about</Link>
    </div>
  )
}
