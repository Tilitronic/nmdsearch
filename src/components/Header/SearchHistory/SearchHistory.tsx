import { useSelector } from 'react-redux';

import HistorySharpIcon from '@mui/icons-material/HistorySharp';

import './SearchHistory.scss';
import { useRef, ChangeEvent, useState, useEffect } from 'react';
import { RootState } from '../../../store/storeTypes';

type HistoryObj = {content: string, id: string, date: string}


export function SearchHistory() {
  const query = useSelector((state: RootState) => state.query.query);
  const localHistory = useSelector((state: RootState) => state.query.history);
  const userHistory = useSelector((state: RootState) => state.user.history);
  const historyRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => (state.user.user));
  const [search, setSearch] = useState('');
  const [isHistShow, setHistShow] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const themeName = useSelector((state: RootState) => state.parameters.ui.themeCC);


  const actualHistory = user ? userHistory : localHistory;
  const historyToShow = searchActive ? actualHistory.filter((element: HistoryObj) => search===element.content.substring(0,search.length)) : actualHistory;
  useEffect(() => {
    if(historyRef.current && isHistShow){
      historyRef.current.focus();
    }
  }, [historyRef, isHistShow]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const input = event.target.value;
    if (input.substring(0,1)!==' '){
      setSearch(input);
    }
    if(search===''){
      setSearchActive(false);
    }
    else{setSearchActive(true);}
  };

  const onHistoryClick = () => {
    setHistShow(!isHistShow);
    if(historyRef.current){
      console.log('ref');
      historyRef.current.focus();
    }
  };

  return (
    <div className='searchHistoryWrapper'>
      <div className='lastSearchWrapper' style={{ display: isHistShow ? 'none' : 'block' }}>
        <p className='LastSearchPhrase noSelection'>Last search: </p>
        <p>{query}</p>
      </div>
      <div>
        {isHistShow &&
        <div>
          <input
            className={'SrHs historyInput inputField '+themeName}
            type='text'
            value={search}
            ref={historyRef}
            onChange={handleSearchChange}
          />
          <div className={'SrHshistoryWrapper dropdownWords SrHs '+themeName}>
            {historyToShow &&
              historyToShow.map((obj: HistoryObj) => {
                return(
                  <div className={'dropdownItem '+themeName} key={'SrHsword'+obj.id}>
                    <p >
                      {obj.content}
                    </p>
                  </div>
                );
              })
            }
          </div>
        </div>
        }

      </div>
      <button onClick={() => onHistoryClick()} className={'LSbutton SrHs transparent '+themeName} title='show/hide search history'>{<HistorySharpIcon />}</button>
    </div>
  );
}