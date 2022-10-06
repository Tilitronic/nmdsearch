import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuery, removeQuery, updateQueryHistory } from '../features/query/querySlice.js'
import { updateHistory } from '../features/user/userSlice.js';
import { useSelector } from 'react-redux';
import { updateDict, resetDictsStore } from '../features/sources/dictsSlice.js';
import store from '../store.js';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

// functions
import {saveWordToDB} from '../services/dbServices.js';
import {getUrbanDictDef} from '../services/urbanDict.js';
import { makeRequests } from '../services/queryManager.js';
import { getDatamuseSug } from '../services/datamuse.js';


//react componentr

// material ui
import { TextField, Popper, Button, Input, InputLabel, InputAdornment, Autocomplete, FormControl, Box  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search.js';
import { height } from '@mui/system';
import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#fffff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fffff',
      },
      '&:hover fieldset': {
        borderColor: '#fffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fffff',
      },
    },
  });

export function SearchField (props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location=useLocation();
    const query = useSelector((state)=>state.query.query); 
    const queryHistory = useSelector((state)=>(state.query.history))
    const [word, setWord] = useState('')
    const [sug, setSug] = useState([])
    const searchField = useRef();
    const user = useSelector((state)=>(state.user.user));

    useEffect(()=>{
        searchField.current.focus()
    }, [location])

    const handleWordChange = async (event)=>{
        // console.log(event.target.value);
        const input = event.target.value;
        if (input.substring(0,1)!==' '){
        setWord(input);
        };
        if (input.length>2){
            const datamuseSug = await getDatamuseSug(input);
            setSug(datamuseSug)
        }
        if (input.length<3){
            setSug([])
        }
    
    }

    const handleKeyPress = (event)=>{
        if(event.key === 'Enter' && word.length>0){
            callSearch();
          }

    }

    const handleKeyDown = (event)=>{
        // if(event.keyCode === 38){
        //     setWord(query)
        //     console.log('38')
        // }
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
            setSug([]);
            dispatch(resetDictsStore())
            if (location.pathname!=='/') {
                navigate('/', { replace: false })
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
        <div className='searchWrapper'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
            <Autocomplete
                sx={{ width: 200 }}
                size="small"
                freeSolo= {true} // no "open" icon button
                id="search-autocomplete"
                options={sug}
                value={word}
                
                onChange={(event, value)=>{if(!value){return} setWord(value.word)}}
                // PopperComponent={PopperMy}
                ListboxProps={{ style: { maxHeight: "fit-content" }, position: "bottom-start" }}
                renderInput={(params) => {
                    return(
                        <TextField 
                            {...params}
                            size='small' 
                            inputRef={searchField}
                            type="text" 
                            id='searchField' 
                            color='secondary'
                            value={word} 
                            label='search'
                            variant="outlined"
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            onChange={handleWordChange} 
                            onKeyPress={handleKeyPress}
                            onKeyDown={handleKeyDown}
                            // InputProps={{
                            //     startAdornment: (
                            //     <InputAdornment position="start">
                            //         <SearchIcon />
                            //     </InputAdornment>),
                            // }}
                        />
                    )
                }}
            />
            <Button variant="contained" color="secondary" id='searchButton' onClick={callSearch}>go</Button>
            </Box>
        </div>
    )
}

const PopperMy = function (props) {
    const styles = (theme) => ({
        popper: {
           height: 500
        }
     });
    return <Popper {...props} style={styles.popper} placement="bottom-start" />;
 };