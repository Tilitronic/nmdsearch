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
    const num = 50;
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
    const sortedByPosSynsets = {noun: [], verb: [], adj: [], adv: [], oth: []}
    for (let synset of synsets){
        const pos = synset.senses[0].properties.pos  
        switch (pos) {
            case 'NOUN':
                sortedByPosSynsets.noun.push(synset)
              break;
            case 'VERB':
                sortedByPosSynsets.verb.push(synset)
                break;
            case 'ADJ':
                sortedByPosSynsets.adj.push(synset)
                break;
            case 'ADV':
                sortedByPosSynsets.adv.push(synset)
                break;
            case null:
                sortedByPosSynsets.oth.push(synset)
                break;
            default:
              console.log("switcher has no variants!");
          }
    }
    const sortedBuSourceSynsets = {wordnet:[], wikipedia: [], wiktionary: [], wikidata: [], omegawiki: []}
    for (let synset of synsets){
        for (let gloss of synset.glosses){
            const source = gloss.source  
            switch (source) {
                case 'WN':
                    sortedBuSourceSynsets.wordnet.push(synset)
                  break;
                case 'WIKI':
                    sortedBuSourceSynsets.wikipedia.push(synset)
                    break;
                case 'WIKIDATA':
                    sortedBuSourceSynsets.wikidata.push(synset)
                    break;
                case 'OMWIKI':
                    sortedBuSourceSynsets.omegawiki.push(synset)
                    break;
                case 'WIKT':
                    sortedBuSourceSynsets.wiktionary.push(synset)
                    break;
                default:
                  console.log("switcher has no variants!");
              }
        }
    }
    console.log("sortedSynsets", sortedByPosSynsets);
    console.log("sortedBuSourceSynsets", sortedBuSourceSynsets);
    console.log(`The BabelNet synsets: `, synsets);
    return synsets
}