import axios from "axios";

// redux state
import store from "../store";
import { updateDict } from "../features/sources/dictsSlice";

const localhost = process.env.REACT_APP_LOCALHOST;
const backend = process.env.REACT_APP_BACKEND;

const url = localhost ? localhost+'dictApi' : backend+'dictApi';

async function getDictApiData(word, apiName){
    try{
        const response = await axios({
            method: 'post',
            url: url,
            params:{
                word: word,
                api: apiName
            }
        });
        console.log(`The ${apiName} data from "${word}" response is: `, response);

        return response.data
      }
      catch(error){
        console.log(`Request "${word}" to ${apiName} failed:`, error)
      }
}

//sources services
import { getUrbanDictDef } from "./urbanDict";
import {getWordnikData} from "./wordnik";
import {getBabelNetDef} from "./babelNet.js";
import {getMeriamWebsterCollegiate, getMeriamWebsterLearners} from "./meriamWebster";

function processData(data, sourceName){
    if (data){
        switch(sourceName){
            case 'urban':
                return data;
                break;
            case 'wordnet':
                return {list: data, dict: sourceName};
                break;
            case 'babelnet':
                return {data: data, dict: sourceName};
                break;
            case 'wordnik':
                return data;
                break;
            default:
                return {data: data, dict: sourceName};
        }
    }
    // else{
    //     return null
    // }

}


export function makeRequests(query){
    
    const allParametres = store.getState().parametres;
    const checkedParametres = Object.values(allParametres).filter((element)=>element.checked===true)
    for (let element of checkedParametres){
        if(element.name==='urban'){
            getUrbanDictDef(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='wordnet'){
            // getWordNetData(query)
            console.log('wordnet working!')
            getDictApiData(query, element.name)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='wordnik'){
            getWordnikData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='babelnet'){
            getBabelNetDef(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='oxford'){
            // getOxfordDef(query)
            getDictApiData(query, element.name)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='wiktionary'){
            getDictData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='meriamL'){
            getMeriamWebsterLearners(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='meriamC'){
            getMeriamWebsterCollegiate(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='words'){
            getDictData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
    }
}