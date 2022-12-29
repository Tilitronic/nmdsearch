import axios from 'axios';

const key = process.env.REACT_APP_BABELNET_API_KEY;
const lang = 'en';

async function getBabelNetSenses(word: string){
  const url = `https://babelnet.io/v7/getSenses?lemma=${word}&searchLang=${lang}&key=${key}`;
  try{
    const response = await axios.get(url,
      { headers: {
        'Accept-Encoding': 'gzip'
      } }
    );
    console.log('The BabelNet data from response is: ', response.data);
    return response.data;
  }
  catch(error){
    console.log('Request to BabelNet failed:', error);
  }
}

async function getBabelNetSynsets(id: string){
  const url = `https://babelnet.io/v7/getSynset?id=${id}&key=${key}`;
  try{
    const response = await axios.get(url,
      // {headers: {
      //     'Accept-Encoding': 'gzip'
      // }}
    );
    console.log(`The BabelNet synset ${id}: `, response.data);
    return response.data;
  }
  catch(error){
    console.log('Request to BabelNet synset failed:', error);
  }
}

export async function getBabelNetDef (word: string){
  let counter = 0;
  const num = 50;
  const rawSenses = await getBabelNetSenses(word);
  counter+=1;
  const ids = rawSenses.map(sense => sense.properties.synsetID.id);
  const idsSet = new Set<string>(ids);
  const uniqueIds = Array.from(idsSet);
  console.log('uniqueIds', uniqueIds);
  const synsets = [];
  console.log('ids', ids);
  console.log('uniqueIds', uniqueIds);
  for (const id of uniqueIds.slice(0, num)){
    const synset = await getBabelNetSynsets(id);
    counter+=1;
    if(synset){
      synsets.push({ id: id, ...synset });
    }
  }
  const sortedByPosSynsets = { noun: [], verb: [], adj: [], adv: [], oth: [] };
  for (const synset of synsets){
    const pos = synset.senses[0].properties.pos;
    switch (pos) {
    case 'NOUN':
      sortedByPosSynsets.noun.push(synset);
      break;
    case 'VERB':
      sortedByPosSynsets.verb.push(synset);
      break;
    case 'ADJ':
      sortedByPosSynsets.adj.push(synset);
      break;
    case 'ADV':
      sortedByPosSynsets.adv.push(synset);
      break;
    case null:
      sortedByPosSynsets.oth.push(synset);
      break;
    default:
      console.log('switcher has no variants!');
    }
  }
  const sortedBySourceSynsets = { wordnet:[], wikipedia: [], wiktionary: [], wikidata: [], omegawiki: [] };
  for (const synset of synsets){
    for (const gloss of synset.glosses){
      const source = gloss.source;
      const obj = { ...gloss, pos: synset.senses[0].properties.pos };
      switch (source) {
      case 'WN':
        sortedBySourceSynsets.wordnet.push(obj);
        break;
      case 'WIKI':
      case 'WIKIDIS':
        sortedBySourceSynsets.wikipedia.push(obj);
        break;
      case 'WIKIDATA':
        sortedBySourceSynsets.wikidata.push(obj);
        break;
      case 'OMWIKI':
        sortedBySourceSynsets.omegawiki.push(obj);
        break;
      case 'WIKT':
      case 'WIKTLB':
        sortedBySourceSynsets.wiktionary.push(obj);
        break;
      default:

      }
    }
  }
  console.log('sortedSynsets', sortedByPosSynsets);
  console.log('sortedBySourceSynsets', sortedBySourceSynsets);
  console.log('The BabelNet synsets: ', synsets);
  return { raw: synsets, sortedBySource: sortedBySourceSynsets, sortedByPos: sortedByPosSynsets };
}