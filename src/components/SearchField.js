import { useState, useRef, useEffect } from 'react';
import {getUrbanDictDef} from './getUrbanDictDef.js';
import {saveWordToDB} from '../services/dbServices.js';
import { useDispatch } from 'react-redux';
import { update, remove } from '../features/query/querySlice.js'
import { useSelector } from 'react-redux';



export function SearchField (props){
    const dispatch = useDispatch()
    const query = useSelector((state)=>state.query.query); 
    const [word, setWord] = useState('')
    const searchField = useRef();

    useEffect(()=>{
        searchField.current.focus()
    })

    const handleWordChange = (event)=>{
        console.log(event.target.value);
        const input = event.target.value;
        if (input.substring(0,1)!==' '){
        setWord(input);
    };
    }

    const handleKeyPress = (event)=>{
        if(event.key === 'Enter' && word.length>0){
            callSearch();
            saveWordToDB(word);
            dispatch((update(word)));
          }
    }

    function search(word){
        console.log('search function works')
        
        if(true){
            getUrbanDictDef(word)
            .then((data)=>{
                props.setUrbanDef(data);
            })
        }
        
    }

    const callSearch = ()=>{
        if (word.length>0){
            search(word);
            setWord('');
        }
    }

    return(
        <div>
            <input ref={searchField} id='searchField' value={word} onChange={handleWordChange} onKeyPress={handleKeyPress}></input>
            <button id='searchButton' onClick={callSearch}>go</button>
        </div>
    )
}

