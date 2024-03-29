type SourceObj = {name: string, url: string, desc: string, lang?: 'en' | 'ua' | 'pl', searchField?: null};

function createSourceObj({ name, url, desc, lang='en', searchField=null }: SourceObj){
  return {
    id: 'descof'+name,
    name,
    lang,
    desc,
    url,
    searchField,
  };
}

function makeALink(phrase: string, link: string){
  return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`;
}

const unofficialApi = makeALink('unofficial API', 'https://pub.dev/packages/urbandictionary/license');
const wordnet_db = makeALink('wordnet-db', 'https://github.com/moos/wordnet-db');
const natural = makeALink('natural', 'https://github.com/NaturalNode/natural');
const wordnikAPI = makeALink('Wordnik API', 'https://developer.wordnik.com/');
const freePlane = makeALink('free plane', 'https://developer.wordnik.com/pricing');
const datamuseApi = makeALink('Datamuse API', 'https://www.datamuse.com/api/');
const babelnetApi = makeALink('BabelNet API', 'https://babelnet.org/guide');
const meriamApi = makeALink('Merriam-Webster Dictionary API', 'https://dictionaryapi.com/');

const sourceObjAr=[
  {
    name: 'Urban Dictionary',
    url: 'https://www.urbandictionary.com/',
    desc: `Urban Dictionary is a crowdsourced online dictionary for slang words and 
        phrases, operating under the motto 'Define Your World'. For accessing information 
        from Urban Dictionary the web page is using ${unofficialApi}.`
  },
  {
    name:'WordNet',
    url:'https://wordnet.princeton.edu/',
    desc: `WordNet is a lexical database of semantic relations between words. WordNet 
        links words into semantic relations including synonyms, hyponyms, and meronyms. The 
        synonyms are grouped into synsets with short definitions and usage examples. WordNet 
        can thus be seen as a combination and extension of a dictionary and thesaurus.<br/>
        The MDSearch page is using ${wordnet_db} and ${natural} Node.js packages to access 
        WordNet data.`
  },
  {
    name:'Wordnik',
    url:'https://www.wordnik.com/',
    desc: `Wordnik is an online English dictionary and language resource that provides 
        dictionary and thesaurus content. Some of the content is based on dictionaries such 
        as the Century Dictionary, the American Heritage Dictionary, WordNet, Wiktionary and 
        GCIDE. Wordnik is the world's biggest online English dictionary, by number of words.
        <br/>Wordnik provides ${wordnikAPI} to request data and they have a ${freePlane} 
        (100 requests/hour), which is the plane MDSearch is using.`
  },
  {
    name:'BabelNet',
    url:'https://babelnet.org',
    desc: `BabelNet is a lexicalized semantic network and ontology. BabelNet is obtained 
        from the automatic integration of Wikipedia, WordNet, Wiktionary, OmegaWiki, ImageNet
        and other resources. The MDSearch page is using free plan of ${babelnetApi} (1000 
        requests/day).`
  },
  {
    name:'Meriam-Webster',
    url:'https://www.merriam-webster.com',
    desc: `Meriam-Webster is the oldest dictionary publisher in the United States.
        The MDSearch page is using free ${meriamApi} (1000 requests/day) for Merriam-Webster's 
        Collegiate Dictionary and Learners Dictionary  dictionaries. 
        `
  },
  {
    name:'Datamuse',
    url:'https://datamuse.com/',
    desc: `Datamuse is a collection of websites (OneLook, RhymeZone and other), 
        mobile apps, and APIs designed to help people create and communicate more effectively.
        The ${datamuseApi} is a lexical search service for developers. The API can help 
        to find words that match a given set of constraints and that are likely in a given 
        context, get definitions, suggestions and more. The MDSearch is using ${datamuseApi} 
        for search “autocomplete” suggesttions.`
  },
];

export const sourcesAr = sourceObjAr.map(obj => createSourceObj(obj));



