import {useState, useContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove} from '../features/user/userSlice.js';

import {ShowNotes} from '../components/Shownotes.js';

import {ShowUrbanDictDef} from '../components/ShowUrbanDictDef.js';
import {getBabelNetDef} from '../services/babelNet.js';
import {getDatamuseSug} from '../services/datamuse.js';
import {getWordNetData} from '../services/wordnet.js';
import { Togglable } from '../components/Togglable.js';

import parse from 'html-react-parser';
import store from '../store.js';

export function Home(){
    
    
  
    // getDatamuseSug('dic')
    // getWordNetData('ass');
    
  
    // subscribe makes subscribtion every time element renders, so there are more logs every time!
    // store.subscribe(()=>{
    //     const storeNow = store.getState(user)
    //     console.log('storeNow', storeNow)
    //   })

    return(
        <div className="App">
      <div>
        <div>

          
          <ShowUrbanDictDef/>
          
          {/* <ShowNotes/> */}
        </div>

      </div>
    </div>
    )
}