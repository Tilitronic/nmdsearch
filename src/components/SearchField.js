import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuery, removeQuery, updateQueryHistory } from '../features/query/querySlice.js'
import { updateHistory } from '../features/user/userSlice.js';
import { useSelector } from 'react-redux';
import { updateDict } from '../features/sources/dictsSlice.js';
import store from '../store.js';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

// functions
import {saveWordToDB} from '../services/dbServices.js';
import {getUrbanDictDef} from '../services/urbanDict.js';
import { makeRequests } from '../services/queryManager.js';


//react componentr

// material ui
import { TextField, Button, Input, InputLabel, InputAdornment, FormControl, Box  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search.js';

export function SearchField (props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location=useLocation();
    const query = useSelector((state)=>state.query.query); 
    const queryHistory = useSelector((state)=>(state.query.history))
    const [word, setWord] = useState('')
    const searchField = useRef();
    const user = useSelector((state)=>(state.user.user));

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

    const handleKeyDown = (event)=>{
        if(event.keyCode === 38){
            setWord(query)
            console.log('38')
        }
    }

    function search(word){   
        makeRequests(word)     
        if(true){
            // getUrbanDictDef(word)
            // .then((data)=>{
            //     dispatch(updateDict({dict:'urban', ...data}))
            // })
            // .then(console.log('store', store.getState().dicts))
        }

        
    }

    const callSearch = async ()=>{
        if (word.length>0){
            const opWord = word;
            search(word);
            setWord('');
            
            if (location.pathname!=='/') {
                navigate('/', { replace: true })
            }

            saveWordToDB(opWord);

            dispatch((updateQuery(opWord)))
            window.localStorage.setItem(
                'queryMDSearch', JSON.stringify(opWord)
                );
            if (!user){
                dispatch(updateQueryHistory(
                    {content: opWord, id: nanoid(), date: new Date().toLocaleString()}
                    ));
                const history = store.getState().query.history;
                window.localStorage.setItem(
                    'queryHistoryMDSearch', JSON.stringify(history)
                    );
            }
            else{
                dispatch(updateHistory(
                    {content: opWord, id: nanoid(), date: new Date().toLocaleString()}
                    ));
                const history = store.getState().user.history;
                window.localStorage.setItem(
                    'queryHistoryMDSearch', JSON.stringify(history)
                    );
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
            onKeyDown={handleKeyDown}
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

