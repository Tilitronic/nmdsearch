import axios from 'axios';

// export function search(word){
//     console.log('search func works')

//     if(true){
//         getUrbanDictDef(word)
//         .then((data)=>{showUrbanDictDef(data)})
//     }

// }

export async function getUrbanDictDef (word){
  const url='https://api.urbandictionary.com/v0/define?term='+word;
  try{
    const response = await axios.get(url);
    console.log('The Urban Dictionary data from response is: ', response);
    return response.data;
  }
  catch(error){
    console.log('Request to Urban Dictionary failed:', error);
  }
}

// export function showUrbanDictDef(){

// }