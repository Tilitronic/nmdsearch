import axios from 'axios';
import { store } from '../store/store';

const useCanonical=true; //If true will try to return the correct word root ('cats' -> 'cat'). If false returns exactly what was requested.

const key = process.env.REACT_APP_WORDNIK_KEY;

const baseUrl = 'https://api.wordnik.com/v4/word.json/';

const definition = `/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=${useCanonical}&includeTags=false&api_key=${key}`;
const audio = `/audio?useCanonical=${useCanonical}&limit=50&api_key=${key}`;
const examples = `/examples?includeDuplicates=false&useCanonical=${useCanonical}&limit=10&api_key=${key}`;
const pronunciations = `/pronunciations?useCanonical=${useCanonical}&typeFormat=IPA&limit=50&api_key=${key}`;



function processData(data){
  let definitions = data.definitions;
  function sortDefenitionsBySource (origins, definitions){
    for (let def of definitions){
      for(let origin of origins){
        if(def.sourceDictionary===origin.id && def.text){
          origin.definitions.push(def);
        }
      }
    }
  }

  function sortDefinitionsByPartOfSpeach(data){
    for(let source of data){
      const typesOfDefs = source.definitions.map((item) => {return({ id: item.word+'_'+item.partOfSpeech, word: item.word, partOfSpeech: item.partOfSpeech, url: item.wordnikUrl, sourceDictionary: item.sourceDictionary, definitions: [] });});
      const uniqueTypesOfDefs = [...new Map(typesOfDefs.map((item) => [item['id'], item])).values()];
      // console.log("uniqueTypesOfDefs", uniqueTypesOfDefs);
      for (let def of source.definitions){
        for(let defType of uniqueTypesOfDefs){
          if (def.word+'_'+def.partOfSpeech===defType.id){
            defType.definitions.push(def);
          }
        }
      }
      source.typesOfDefinitions.push(...uniqueTypesOfDefs);
    }
  }
  const defOrigins = definitions.map((obj) => {return({ name: obj.attributionText, source: obj.sourceDictionary, url: obj.attributionUrl, id: obj.sourceDictionary, definitions: [], typesOfDefinitions: [] });});
  const uniqDefOrigins = [...new Map(defOrigins.map((item) => [item['id'], item])).values()];
  sortDefenitionsBySource(uniqDefOrigins, definitions);
  sortDefinitionsByPartOfSpeach(uniqDefOrigins);

  return { audio: data.audio, examples: data.examples, pronunciations: data.pronunciations, definitions: uniqDefOrigins };
}

export async function getWordnikData (word){
  const parameters = store.getState().parameters.sources.wordnik.parameters;
  console.log('wordnik parameters', parameters);
  let data = {};
  const url = baseUrl+word;
  if(parameters.definition){
    try{
      const response = await axios.get(url+definition);
      // console.log(`The Wordnik data from response is: `, response);
      data.definitions= response.data;
    }
    catch(error){
      console.log('Request to Wordnik definition failed:', error);
    }
  }
  if(parameters.audio){
    try{
      const response = await axios.get(url+audio);
      // console.log(`The Wordnik data from response is: `, response);
      data.audio= response.data;
    }
    catch(error){
      console.log('Request to Wordnik audio failed:', error);
    }
  }
  if(parameters.examples){
    try{
      const response = await axios.get(url+examples);
      // console.log(`The Wordnik data from response is: `, response);
      data.examples= response.data.examples;
    }
    catch(error){
      console.log('Request to Wordnik examples failed:', error);
    }
  }
  if(parameters.pronunciations){
    try{
      const response = await axios.get(url+pronunciations);
      // console.log(`The Wordnik data from response is: `, response);
      data.pronunciations= response.data;
    }
    catch(error){
      console.log('Request to Wordnik pronunciations failed:', error);
    }
  }
  console.log('Wordnik data from response:', data);

  return processData(data);

}