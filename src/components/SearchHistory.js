import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import store from '../store.js';


import {Togglable} from './Togglable.js';
import { updateQuery, removeQuery, updateQueryHistory} from '../features/query/querySlice.js'
import { updateHistory } from '../features/user/userSlice.js';
import {getUserSearchHistory} from '../services/dbServices.js';

//material ui
import { TextField, Autocomplete  } from '@mui/material';


export function SearchHistory(params){
    const [searchActive, setsearchActive] = useState(false);
    const [search, setSearch] = useState('');
    const [historyVisible, sethistoryVisible] = useState(false);
    const localHistory = useSelector((state) => state.query.history);
    const userHistory = useSelector((state) => state.user.history);
    const query = useSelector((state)=>state.query.query)
    const inputRef = useRef();
    const dispatch = useDispatch();
    const shouldUseEffect=useRef(true);
    const user = useSelector((state) => state.user.user);

    // useEffect(()=>{
    //     inputRef.current.focus()
    // })

    // useEffect(()=>{
    //     if (shouldUseEffect.current){
    //         shouldUseEffect.current=false;
    //         const queryJSON = window.localStorage.getItem('queryMDSearch');
    //         if (queryJSON) {
    //         const query = JSON.parse(queryJSON)
    //         dispatch((updateQuery(query)))
    //         } 
    //         const queryHistoryJSON = window.localStorage.getItem('queryHistoryMDSearch');
    //         if (queryHistoryJSON) {
    //         const queryHistory = JSON.parse(queryHistoryJSON).reverse();
    //         console.log("queryHistory parsed from JSON", queryHistory);
    //         for (let element of queryHistory){
    //             console.log("tore.getState().user", store.getState().user);
    //             if(store.getState().user){
    //                 dispatch(updateHistory(element))
    //             }
    //             else{dispatch(updateQueryHistory(element));
    //             }  
    //         }
    //     }}
    // }, [])

    const handleSearchChange = (event) => {
        // console.log(event.target.value)
        // console.log("event", event);
        setSearch(event.target.value);
        if(setSearch===''){
          setsearchActive(false)
        }
        else{setsearchActive(true)}
      }

    // console.log("userHistory", userHistory);
    const actualHistory = user ? userHistory : localHistory;
    // console.log("actualHistory", actualHistory);
    const labledHistory = actualHistory.map((obj)=>{
        return {label: obj.content, ...obj}
    })
    console.log("labledHistory", labledHistory);
    const historyToShow = searchActive ? actualHistory.filter((element)=>search===element.content.substring(0,search.length)) : actualHistory;
    // console.log("historyToShow", historyToShow);



    return (
        <div>
            <div className='lastQuery'>
                {/* {actualHistory[0].content && actualHistory[0].content} */}
            </div>
            {/* <div>
                <div>query: {query}</div>
                <div>{parse('    ')}</div>
            </div> */}
            <div>
            <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={labledHistory.slice(0, 50)}
                sx={{ width: 150 }}
                value={query}
                renderInput={(params) => <TextField {...params} label="history" />}
            />
            </div>


            {/* <Togglable turnOn='show history!' turnOff1='hide history'>
                <div>
                    Search <input ref={inputRef} id="search" value={search} onChange={handleSearchChange}/>
                    <ul>
                        {historyToShow.map(element=>{
                            return <Query key={element.id} element={element}/>
                        }
                        // <li key={query.id}>{query.content}</li>
                        
                        )}
                    </ul>
                </div>
            </Togglable> */}
 

        </div>
    )
}


function Query ({element}){
    // console.log("element", element);
    return(
        <li>{element.content}</li>
    )
  }