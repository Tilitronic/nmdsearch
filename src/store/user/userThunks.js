import { updateHistory } from './userSlice.js';
import { getUserSearchHistory } from '../../apis/dbServices.js';


export function getUserQueryHistory () {
  console.log('getUserQueryHistory just maked smth');
  return async function getHistory (dispatch, getState){
    const searchHistory = await  getUserSearchHistory();
    dispatch((updateHistory(searchHistory)));

  };}