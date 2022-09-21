import axios from 'axios';
import store from '../store';

const useCanonical=true //If true will try to return the correct word root ('cats' -> 'cat'). If false returns exactly what was requested.

const key = process.env.REACT_APP_WORDNIK_KEY;

const baseUrl = 'https://api.wordnik.com/v4/word.json/'

const definition = `/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=${useCanonical}&includeTags=false&api_key=${key}`
const audio = `/audio?useCanonical=${useCanonical}&limit=50&api_key=${key}`
const examples = `/examples?includeDuplicates=false&useCanonical=${useCanonical}&limit=10&api_key=${key}`
const pronunciations = `/pronunciations?useCanonical=${useCanonical}&typeFormat=IPA&limit=50&api_key=${key}`

export async function getWordnikData (word){
    const parametres = store.getState().parametres.wordnik.parametres
    console.log("wordnik parametres", parametres);
    let data = {};
    const url = baseUrl+word;
    if(parametres.definition){
        try{
            const response = await axios.get(url+definition)
            // console.log(`The Wordnik data from response is: `, response);
            data.definitions= response.data
        }
        catch(error){
            console.log("Request to Wordnik definition failed:", error)
        };
    }
    if(parametres.audio){
        try{
            const response = await axios.get(url+audio)
            // console.log(`The Wordnik data from response is: `, response);
            data.audio= response.data
        }
        catch(error){
            console.log("Request to Wordnik audio failed:", error)
        };
    }
    if(parametres.etymologies){
        try{
            const response = await axios.get(url+etymologies)
            // console.log(`The Wordnik data from response is: `, response);
            data.etymologies= response.data
        }
        catch(error){
            console.log("Request to Wordnik etymologies failed:", error)
        };
    }
    if(parametres.examples){
        try{
            const response = await axios.get(url+examples)
            // console.log(`The Wordnik data from response is: `, response);
            data.examples= response.data.examples
        }
        catch(error){
            console.log("Request to Wordnik examples failed:", error)
        };
    }
    if(parametres.pronunciations){
        try{
            const response = await axios.get(url+pronunciations)
            // console.log(`The Wordnik data from response is: `, response);
            data.pronunciations= response.data
        }
        catch(error){
            console.log("Request to Wordnik pronunciations failed:", error)
        };
    }
    console.log("Wordnik data from response:", data);
    return data

}