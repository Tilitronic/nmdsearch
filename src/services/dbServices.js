import axios from "axios";
import store from '../store.js';
import { useDispatch } from 'react-redux';
import { update, remove, updateHistory} from '../features/user/userSlice.js'




const url= process.env.REACT_APP_LOCALHOST ? process.env.REACT_APP_LOCALHOST : 'https://md-search.herokuapp.com/';
const urlWords = url+'api/words';
const urlHistory = url+'api/users/history';

export async function saveWordToDB(word){
  console.log('saveWordToDB started')
  const user = store.getState().user.user;
  console.log("user", user);
  if (user){
    try{
      console.log(`Word ${word} is about to be send to DB`);
      const response = await axios({
          method: 'post',
          url: urlWords,
          params:{
              content: word,
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`}
      });
      return response.data
    }
    catch(error){
      console.log("Request to DB failed:", error)
    }
  }
  else if (!user){
    try{
      console.log(`Word ${word} is about to be send to DB`);
      const response = await axios({
          method: 'post',
          url: urlWords,
          params:{
            content: word,
          }
      });
      
      return response.data
    }
    catch(error){
      console.log("Request to DB failed:", error)
    }
  }
    
}

export async function getUserSearchHistoryRequest(){
  console.log('getUserHistory started');
  const user = store.getState().user.user;
  console.log("user", user);
  if (user){
    try{
      console.log(`Trying to get history of user ${user.username}`);
      const response = await axios({
          method: 'get',
          url: urlHistory,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`}
      });
      return response.data
    }
    catch(error){
      console.log("Request to DB failed:", error)
    }
  } 
  else{
    return 'no user logged'
  } 
}

export async function getUserSearchHistory(){
  const rawHistory = await getUserSearchHistoryRequest();
  const history = rawHistory[0].words;
  if (history){
      store.dispatch(updateHistory(history));
  };
  console.log("history", history);
}