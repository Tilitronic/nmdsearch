import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';


export function SearchHistory(params){
    const [searchActive, setsearchActive] = useState(false);
    const [search, setSearch] = useState('');
    const [historyVisible, sethistoryVisible] = useState(false);
    const history = useSelector((state) => state.user.history)
    const inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus()
    })

    const showHistory = () => {
        // getHistory();
        sethistoryVisible(true);
    }

    // const hideHistory = () => sethistoryVisible(false);

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        console.log("event", event);
        setSearch(event.target.value);
        if(setSearch===''){
          setsearchActive(false)
        }
        else{setsearchActive(true)}
      }

    const historyToShow = searchActive ? history.filter((note)=>search===note.content.substring(0,search.length)) : history;

   

    
    
    
    return (
        <div>
        {/* {!historyVisible && <button onClick={showHistory}>show history</button>}
        {historyVisible && <button onClick={hideHistory}>hide history</button>}

        
        {historyVisible && null} */}
            <div>
                Search <input ref={inputRef} id="search" value={search} onChange={handleSearchChange}/>
                <ul>
                    {historyToShow.map(query=>
                    // <li key={query.id}>{query.content}</li>
                    <Query key={query.id} query={query}/>
                    )}
                </ul>
            </div>
        </div>
    )
}


function Query ({query}){

    return(
      <li>{query.content}</li>
    )
  }