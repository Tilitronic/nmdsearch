import axios from "axios";

const url= process.env.REACT_APP_LOCALHOST ? process.env.REACT_APP_LOCALHOST+'wordnet' : 'https://md-search.herokuapp.com/wordnet';

const headers = {
    'Allow-Control-Allow-Origin': '*'
  }


export async function getWordNetData(word){
    try{
        const response = await axios({
            method: 'post',
            url: url,
            params:{
                word: word,
            }
        });
        console.log(`The WordNet data from response is: `, response);

        return response.data
      }
      catch(error){
        console.log("Request to WordNet failed:", error)
      }
}
