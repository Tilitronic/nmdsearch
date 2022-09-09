import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import {Header} from './components/Header'
import {Home} from './components/Home.js'
import { About } from './components/About.js';
import { Container } from '@mui/material';





function App() {
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
