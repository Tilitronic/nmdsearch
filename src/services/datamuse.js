import axios from "axios";


const syn = `/words/rel_syn=`;
const ant = `/words/rel_ant=`;
const met = '&md=dprf' //definition, parts of speaches, pronounciation, frequency
const max = `&max=`

const url = 'https://api.datamuse.com';
const sug = `/sug?s=`;


export async function getDatamuseData(word,type=syn,num=10){
    try{
        const response = await axios.get(url+syn+word+met+max+num)
        console.log(`The Datamuse ${type} data from response is: `, response);
        return response.data
      }
      catch(error){
        console.log("Request to Datamuse failed:", error)
      }
}

export async function getDatamuseSug(word,num=10){
    try{
        const response = await axios.get(url+sug+word+max+num)
        console.log(`The Datamuse suggestion data from response is: `, response);
        const data = response.data
        const lableddData = data.map((obj)=>{
          return({label: obj.word, ...obj})
        })
        return lableddData
      }
      catch(error){
        console.log("Request to Datamuse suggestion failed:", error)
      }
}
