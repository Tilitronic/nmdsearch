import axios from "axios";

const key = process.env.REACT_APP_OXFORD
const appId = process.env.REACT_APP_OXFORD_APP_ID
const baseUrl='https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/'

export async function getOxfordDef(word){
    const url=baseUrl+word
    try{
        const response = await axios({
            method: 'get',
            url: url,
            headers: {
              'app_id': appId,
              'app_key': key,
            //   'Access-Control-Allow-Origin': '*',
            //   'Content-Type': 'application/json;charset=utf-8',
            //   'Content-Length':'24505',
            //   'Connection':'keep-alive',
            //   'Server':'openresty'


            }
        });
        console.log(`The Oxford Dictionary data from response is: `, response.data);
        return response.data
      }
      catch(error){
        console.log("Request to Oxford Dictionary:", error)
      }
}