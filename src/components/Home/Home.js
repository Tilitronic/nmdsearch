import './Home.css'
import {useState, useContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove} from '../../features/user/userSlice.js';


//functions
import {getBabelNetDef} from '../../services/babelNet.js';
import {getDatamuseSug} from '../../services/datamuse.js';
import {getWordNetData} from '../../services/wordnet.js';

// react elements
import {ShowNotes} from '../../components/Shownotes.js';
import { Display } from '../Display/Display.jsx';
import { ShowWordnet } from '../ShowWordnet.js';
import { Togglable } from '../../components/Togglable.js';
import {ShowUrbanDictDef} from '../../components/ShowUrbanDictDef.js';


import parse from 'html-react-parser';
import store from '../../store.js';

export function Home(){
    
    
  
    // getDatamuseSug('dic')
    // getWordNetData('ass');
    
  
    // subscribe makes subscribtion every time element renders, so there are more logs every time!
    // store.subscribe(()=>{
    //     const storeNow = store.getState(user)
    //     console.log('storeNow', storeNow)
    //   })

    return(
        <div className='mainDisplayWrapper'>
          <Display name={'Urban Dictionary'}>
            <ShowUrbanDictDef/>
          </Display>
          <Display name={'WordNet'}>
            <ShowWordnet/>
          </Display>
          {/* <ShowNotes/> */}
        </div>
    )
}