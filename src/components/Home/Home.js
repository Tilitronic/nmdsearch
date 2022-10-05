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
import { ShowWordnik } from '../ShowWordnik.js';
import { ShowBabelnet } from '../ShowBabenet.js';
import { ShowMeriamWebsterL,  ShowMeriamWebsterC} from '../ShowMeriam.js';


import parse from 'html-react-parser';
import store from '../../store.js';

function SourcesResultsDisplays(){
  const dictsParam = useSelector((state)=>state.parametres);


  
}

export function Home(){
    const dictsState = useSelector((state)=>state.dicts);
    const dictsParam = useSelector((state)=>state.parametres);

    const displayElements=Object.values(dictsParam).map((element)=>{
      if(element.checked && dictsState[element.name]){
        let sourceElement
        switch (element.name) {
          case 'urban':
            sourceElement = <ShowUrbanDictDef/>
            break;
          case 'wordnet':
            sourceElement = <ShowWordnet/>
            break;
          case 'wordnik':
            sourceElement = <ShowWordnik/>
            break;
          case 'babelnet':
            sourceElement = <ShowBabelnet/>
            break;
          case 'meriamL':
            sourceElement = <ShowMeriamWebsterL/>
            break;
          case 'meriamC':
            sourceElement = <ShowMeriamWebsterC/>
            break;
          default:
            return;
        }
        return (
          <Display name={element.label}>
            {sourceElement}
          </Display>
      )
      }
      else{return}
      
  
    })
  
    // subscribe makes subscribtion every time element renders, so there are more logs every time!
    // store.subscribe(()=>{
    //     const storeNow = store.getState(user)
    //     console.log('storeNow', storeNow)
    //   })

    return(
        <div className='mainDisplayWrapper'>
          {/* {dictsParam.urban.checked && 
          <Display name={'Urban Dictionary'}>
            <ShowUrbanDictDef/>
          </Display>}
          {dictsParam.wordnet.checked &&
          <Display name={'WordNet'}>
            <ShowWordnet/>
          </Display>}
          { dictsParam.wordnik.checked &&      
          <Display name={'Wordnik'}>
            <ShowWordnik/>
          </Display>}
          { dictsParam.babelnet.checked &&      
          <Display name={'BabelNet'}>
            <ShowBabelnet/>
          </Display>} */}
          {displayElements}


          {/* <ShowNotes/> */}
        </div>
    )
}