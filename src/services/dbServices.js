import axios from "axios";
import store from '../store.js';
import { useDispatch } from 'react-redux';
import { update, remove, updateHistory} from '../features/user/userSlice.js'


const localhost = process.env.REACT_APP_LOCALHOST;
const backend = process.env.REACT_APP_BACKEND;

const url= localhost ? localhost : backend;
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
  const user = store.getState().user.user;
  if(user){
    const rawHistory = await getUserSearchHistoryRequest();
    let history = []
    if(rawHistory.length>0){
      history=rawHistory[0].words.reverse()
    }
    if (history.length>0){
        for (let element of history){
          store.dispatch(updateHistory(element));
        }
    };
    const hist = store.getState().user.history;
    window.localStorage.setItem(
        'queryHistoryMDSearch', JSON.stringify(hist)
        );
    console.log("history", history);
  }

}