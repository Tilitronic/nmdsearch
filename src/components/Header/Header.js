import './header.css'



//redux state
import { useDispatch, useSelector } from 'react-redux';
import { update, remove} from '../../features/user/userSlice.js';
import { updateQuery, removeQuery, updateQueryHistory } from '../../features/query/querySlice.js'
import {useState, useEffect} from 'react';

//react elements
import {SearchField} from '../SearchField.js';
import { SearchHistory } from "../SearchHistory.js";
import { Parametres } from '../Parametres';
import { LoginAndProfile } from '../LoginAndProfile.js';
import { Navigation } from '../Navigation/Navigation'; 

//modern ui
import { AppBar, Toolbar, Divider } from '@mui/material';

export function  Header(){
    const [urbanDef, setUrbanDef] = useState('');
  
    const updateUrbanState = (data)=>{setUrbanDef(data)};
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();
   
    return(
        <AppBar>
            {/* <Toolbar> */}
                <div className='header'>
                    <div className='search'>
                        <SearchField setUrbanDef={updateUrbanState}/>
                    </div>
                    <div className='history'>
                        <SearchHistory/>
                    </div>
                    <div className='navigation'>
                        <Navigation/>
                    </div>
                    <div className='params'>
                        <Parametres/>
                    </div>
                    <div id='loginAndProfileWrapper'>
                        <LoginAndProfile/>
                    </div>
                </div>
            {/* </Toolbar> */}
        </AppBar>
    )   
}