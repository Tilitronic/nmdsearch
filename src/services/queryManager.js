
// redux state
import store from "../store";
import { updateDict } from "../features/sources/dictsSlice";

//sources services
import { getUrbanDictDef } from "./urbanDict";
import { getWordNetData } from "./wordnet";
import {getWordnikData} from "./wordnik";
import {getBabelNetDef} from "./babelNet.js"

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
                return {list: data, dict: sourceName};
                break;
            case 'wordnik':
                
                return data;
                break;
            default:
                return data;
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
            getWordNetData(query)
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
            getDictData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='wiktionary'){
            getDictData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='meriam'){
            getDictData(query)
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