import { useState, useRef, useEffect } from 'react';
import {getUrbanDictDef} from '../services/urbanDict.js';
import {saveWordToDB} from '../services/dbServices.js';
import { useDispatch } from 'react-redux';
import { update, remove } from '../features/query/querySlice.js'
import { useSelector } from 'react-redux';
import { updateDict } from '../features/sources/dictsSlice.js';
import store from '../store.js';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { TextField, Button, Input, InputLabel, InputAdornment, FormControl, Box  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search.js';

export function SearchField (props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location=useLocation();
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
          }
    }

    function search(word){
        console.log('search function works')
        
        if(true){
            getUrbanDictDef(word)
            .then((data)=>{
                dispatch(updateDict({dict:'urban', ...data}))
            })
            .then(console.log('store', store.getState().dicts))
        }

        
    }
    console.log(location)

    const callSearch = async ()=>{
        if (word.length>0){
            search(word);
            setWord('');
            saveWordToDB(word);
            dispatch((update(word)));
            if (location.pathname!=='/') {
                navigate('/', { replace: true })
            }
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

