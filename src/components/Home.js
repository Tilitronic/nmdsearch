import {useState, useContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove} from '../features/user/userSlice.js';

import {ShowNotes} from '../components/Shownotes.js';
import {SearchField} from '../components/SearchField.js';
import {ShowUrbanDictDef} from '../components/ShowUrbanDictDef.js';
import {getBabelNetDef} from '../services/babelNet.js';
import {getDatamuseSug} from '../services/datamuse.js';
import {getWordNetData} from '../services/wordnet.js';
import { LoginAndProfile } from '../components/LoginAndProfile.js';
import { Togglable } from '../components/Togglable.js';

import parse from 'html-react-parser';
import store from '../store.js';

export function Home(){
    const [urbanDef, setUrbanDef] = useState('');
    const [loginVisible, setLoginVisible] = useState(false)
  
    const updateUrbanState = (data)=>{setUrbanDef(data)}
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();
  
    // getDatamuseSug('dic')
    // getWordNetData('ass');
    useEffect(()=>{
      const loggedUserJSON = window.localStorage.getItem('loggedMDSearchUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch((update(user)))
      }  }, [])
  
    // subscribe makes subscribtion every time element renders, so there are more logs every time!
    // store.subscribe(()=>{
    //     const storeNow = store.getState(user)
    //     console.log('storeNow', storeNow)
    //   })

    return(
        <div className="App">
      <div>
        <div>
          <SearchField setUrbanDef={updateUrbanState}/>
          <div id='loginAndProfileWrapper'>
          <LoginAndProfile/>
          </div>
          
          <ShowUrbanDictDef data={urbanDef}/>
          
          {/* <ShowNotes/> */}
        </div>

      </div>
    </div>
    )
}