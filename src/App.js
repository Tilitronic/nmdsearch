import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import { useState, useRef, useEffect } from 'react';

//redux store
import { useSelector, useDispatch } from 'react-redux';
import store from './store.js';
import { updateQuery, removeQuery, updateQueryHistory } from './features/query/querySlice.js'
import { update, updateHistory } from "./features/user/userSlice.js";

//react components
import {Header} from './components/Header';
import {Home} from './components/Home';
import { About } from './components/About.js';

//material ui
import { Container } from '@mui/material';





function App() {
  const shouldUseEffect=useRef(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    if (shouldUseEffect.current){
      shouldUseEffect.current=false;

      //update user redux state
      const loggedUserJSON = window.localStorage.getItem('loggedMDSearchUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch((update(user)))
      } 

      //update query redux state
      const queryJSON = window.localStorage.getItem('queryMDSearch');
      if (queryJSON) {
        const query = JSON.parse(queryJSON)
        dispatch((updateQuery(query)))
      } 

      //update query history redux state
      const queryHistoryJSON = window.localStorage.getItem('queryHistoryMDSearch');
      if (queryHistoryJSON) {
        const queryHistory = JSON.parse(queryHistoryJSON).reverse();
        for (let element of queryHistory){
          if(store.getState().user.user){
            dispatch(updateHistory(element))
          }
          else{
            // console.log("element", element);
            dispatch(updateQueryHistory(element));
          }  
        } 
      }
     
    }
}, [])

  return (
    <Container>
      <div>
        <Header/>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
    </Container>
 
    
  );
}

export default App;
