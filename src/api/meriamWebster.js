import axios from 'axios';
const keyL = '?key=' + process.env.REACT_APP_MW_LEARNERS;
const keyC = '?key=' + process.env.REACT_APP_MW_DICTIONARY;

const urlC = 'https://dictionaryapi.com/api/v3/references/collegiate/json/';
const urlL = 'https://dictionaryapi.com/api/v3/references/learners/json/';



export async function getMeriamWebsterCollegiate (word){
  try{
    const response = await axios.get(urlC+word+keyC);
    console.log('The Meriam-Webster Collegiate data from response is: ', response.data);
    return { collegiate: response.data };
  }
  catch(error){
    console.log('Request to Meriam-Webster Collegiate failed:', error);
  }
}

export async function getMeriamWebsterLearners (word){
  try{
    const response = await axios.get(urlL+word+keyL);
    console.log('The Meriam-Webster Learners data from response is: ', response.data);
    return { learners: response.data };
  }
  catch(error){
    console.log('Request to Meriam-Webster Learners failed:', error);
  }
}

export async function getMeriamWebsterData(word){
  return { learners: await getMeriamWebsterLearners (word), collegiate: await getMeriamWebsterCollegiate (word) };
}