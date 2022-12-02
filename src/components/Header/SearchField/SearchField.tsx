import  './SearchField.scss';

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateQuery, updateQueryHistory } from '../../../store/query/querySlice';
import { updateHistory } from '../../../store/user/userSlice';
import { resetDictsStore } from '../../../store/sources/dictsSlice';

import { useOutsideClickDetector } from '../../../hooks/useOutsideClickDetector';

import { useNavigate, useLocation } from 'react-router-dom';

import { saveWordToDB } from '../../../api/dbServices';
import { makeRequests } from '../../../api/queryManager';
import { getDatamuseSug } from '../../../api/datamuse';

import { nanoid } from 'nanoid';

import { RootState } from '../../../store/storeTypes';

type sugObject = {
  word: string,
  score: number
}


export function SearchField  () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation();
  const [word, setWord] = useState('');
  const [sug, setSug] = useState<sugObject[]>([]);
  const searchField = useRef<HTMLInputElement>(null);
  const suggestionsWrapper = useRef<HTMLDivElement>(null);
  const [showSug, setShowSug] = useState(false);
  const [selectedSug, setSelectedSug] = useState(-1);
  const user = useSelector((state: RootState) => (state.user.user));

  const themeName = useSelector((state: RootState) => state.parameters.ui.themeCC);



  useOutsideClickDetector(suggestionsWrapper, showSug, () => {setShowSug(false);}, suggestionsWrapper);

  useEffect(() => {
    searchField.current.focus();
  }, [location]);

  const handleWordChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const input = event.target.value;
    if (input.substring(0,1)!==' '){
      setWord(input);
    }
    if (input.length>2){
      const datamuseSug = await getDatamuseSug(input);
      setSug(datamuseSug);
      setShowSug(true);
    }
    if (input.length<3){
      setSug([]);
      setSelectedSug(-1);
    }
  };

  const startSearch = async () => {
    if (!word){return;}
    makeRequests(word);
    setWord('');
    setSug([]);
    dispatch(resetDictsStore(null));
    if (location.pathname!=='/') {
      navigate('/');
    }
    saveWordToDB(word);
    dispatch(updateQuery(word));
    if (!user){
      dispatch(updateQueryHistory(
        { content: word, id: nanoid(), date: new Date().toLocaleString() }
      ));
    }
    else{
      dispatch(updateHistory(
        { content: word, id: nanoid(), date: new Date().toLocaleString() }
      ));
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if(event.key === 'Enter' && word.length>0 && selectedSug===-1){
      startSearch();
    }
    if(event.key === 'Enter' && selectedSug>-1){
      const word=sug[selectedSug].word;
      setWord(word);
      setSelectedSug(-1);
      setShowSug(false);
      setSug([]);
    }
    if(event.code === 'ArrowUp' && selectedSug-1>=0){
      event.preventDefault();
      setSelectedSug(selectedSug-1);
    }
    if(event.code === 'ArrowUp' && selectedSug-1<0){
      event.preventDefault();
      setSelectedSug(sug.length-1);
    }
    if(event.code === 'ArrowDown' && selectedSug+1<sug.length){
      setSelectedSug(selectedSug+1);
    }
    if(event.code === 'ArrowDown' && selectedSug+1===sug.length){
      setSelectedSug(0);
    }
  };

  const handleSuggestionSelection = (suggestion: string) => {
    setWord(suggestion);
    setShowSug(false);
    if(searchField.current){
      searchField.current.focus();
    }
  };



  return (
    <div className={'searchFieldWrapper '}>
      <div className='inputAndButtonWrapper'>
        <input
          className={themeName+' inputField SF'}
          type='text'
          value={word}
          ref={searchField}
          onChange={handleWordChange}
          onKeyDown={handleKeyPress}
        />
        <button className={'SF goButton '+themeName}>go</button>
      </div>
      <div className={'suggestionsWrapper dropdownWords SrFl '+themeName} ref={suggestionsWrapper}>
        {
          sug && sug.map((element: {word: string, score: number}, index) => {
            let className = 'suggestedItem dropdownItem ';
            className = selectedSug===index? className+' active ': className;
            return(
              <div
                style={{ display: showSug? 'flex': 'none' }}
                className={className+themeName}
                key={'sug'+index}
                onClick={() => {handleSuggestionSelection(element.word);}}
              >
                <p>{element.word}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}