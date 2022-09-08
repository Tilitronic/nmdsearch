import axios from 'axios';

const key = process.env.REACT_APP_BABELNET_API_KEY;
const lang = 'en';

const params = {

}

export async function getBabelNetDef (word){
    const url = `https://babelnet.io/v7/getSenses?lemma=${word}&searchLang=${lang}&key=${key}`;
    try{
        const response = await axios.get(url)
        console.log(`The BabelNet data from response is: `, response);
        return response.data
    }
    catch(error){
        console.log("Request to BabelNet failed:", error)
    };
}