
// redux state
import store from "../store";
import { updateDict } from "../features/sources/dictsSlice";

//sources services
import { getUrbanDictDef } from "./urbanDict";
import { getWordNetData } from "./wordnet";

function processData(data, sourceName){
    switch(sourceName){
        case 'urban':
            return data;
            break;
        case 'wordnet':
            return {list: data, dict: sourceName};
            break;
        default:
            return data;
    }
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
        if(element.name==='wiktionary'){
            getDictData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='oxford'){
            getDictData(query)
            .then((data)=>processData(data, element.name))
            .then((data)=>store.dispatch(updateDict({dict: element.name, ...data})));
        }
        if(element.name==='wordnik'){
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