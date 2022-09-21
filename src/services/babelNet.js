import axios from 'axios';

const key = process.env.REACT_APP_BABELNET_API_KEY;
const lang = 'en';

const params = {

}

async function getBabelNetSenses(word){
    const url = `https://babelnet.io/v7/getSenses?lemma=${word}&searchLang=${lang}&key=${key}`;
    try{
        const response = await axios.get(url, 
            {headers: {
                'Accept-Encoding': 'gzip'
            }}     
            )
        console.log(`The BabelNet data from response is: `, response.data);
        return response.data
    }
    catch(error){
        console.log("Request to BabelNet failed:", error)
    };
}

async function getBabelNetSynsets(id){
    const url = `https://babelnet.io/v7/getSynset?id=${id}&key=${key}`;
    try{
        const response = await axios.get(url, 
            // {headers: {
            //     'Accept-Encoding': 'gzip'
            // }}     
            )
        // console.log(`The BabelNet synset: `, response.data);
        return response.data
    }
    catch(error){
        console.log("Request to BabelNet synset failed:", error)
    };
}

export async function getBabelNetDef (word){
    const num = 5;
    const rawSenses = await getBabelNetSenses(word);
    const ids = rawSenses.map(sense=>sense.properties.synsetID.id);
    const idsSet = new Set(ids);
    const uniqueIds = [...idsSet]
    let synsets = [];
    console.log("ids", ids);
    console.log("uniqueIds", uniqueIds);
    for (let id of uniqueIds.slice(0, num)){
        const synset = await getBabelNetSynsets(id);
        if(synset){
            synsets.push({id: id, ...synset})
        }
    }
    console.log(`The BabelNet synsets: `, synsets);
    return synsets
}