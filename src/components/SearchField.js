import { useState, useRef, useEffect } from 'react';
import {getUrbanDictDef} from './getUrbanDictDef.js';
import {saveWordToDB} from '../services/dbServices.js';
import { useDispatch } from 'react-redux';
import { update, remove } from '../features/query/querySlice.js'
import { useSelector } from 'react-redux';

import { TextField, Button, Input, InputLabel, InputAdornment, FormControl, Box  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search.js';

export function SearchField (props){
    const dispatch = useDispatch()
    const query = useSelector((state)=>state.query.query); 
    const [word, setWord] = useState('')
    const searchField = useRef();

    useEffect(()=>{
        console.log("searchField", searchField);
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

            <TextField 
            size='small' 
            inputRef={searchField}
            type="text" 
            id='searchField' 
            value={word} 
            label='search'
            onChange={handleWordChange} 
            onKeyPress={handleKeyPress}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              />
            <Button variant="contained" color="primary" id='searchButton' onClick={callSearch}>go</Button>
        </div>
    )
}

