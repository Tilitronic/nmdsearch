import { nanoid } from 'nanoid';


function createSourceObj({name, url, desc, lang='en', searchField=null}){
    return {
        id: 'descof'+name,
        name,
        lang,
        desc,
        url,
        searchField,
    }
}
function makeALink(phrase, link){
    return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`
}
const unofficialApi = makeALink('unofficial API', 'https://pub.dev/packages/urbandictionary/license')
const wordnet_db = makeALink('wordnet-db', 'https://github.com/moos/wordnet-db')
const natural = makeALink('natural', 'https://github.com/NaturalNode/natural')
const wordnikAPI = makeALink('Wordnik API', 'https://developer.wordnik.com/')
const freePlane = makeALink('free plane', 'https://developer.wordnik.com/pricing')
const datamuseApi = makeALink('Datamuse API', 'https://www.datamuse.com/api/')

const sourceObjAr=[
    {
        name: 'Urban Dictionary',
        url: 'https://www.urbandictionary.com/',
        desc: `Urban Dictionary is a crowdsourced online dictionary for slang words and phrases, operating under the motto 'Define Your World'. For accessing information from Urban Dictionary the web page is using ${unofficialApi}.`
    },
    {
        name:'WordNet',
        url:'https://wordnet.princeton.edu/',
        desc: `WordNet is a lexical database of semantic relations between words. WordNet links words into semantic relations including synonyms, hyponyms, and meronyms. The synonyms are grouped into synsets with short definitions and usage examples. WordNet can thus be seen as a combination and extension of a dictionary and thesaurus.<br/>
        The MDSearch page is using ${wordnet_db} and ${natural} Node.js packages to access WordNet data.`
    },
    {
        name:'Wordnik',
        url:'https://www.wordnik.com/',
        desc: `Wordnik is an online English dictionary and language resource that provides dictionary and thesaurus content. Some of the content is based on dictionaries such as the Century Dictionary, the American Heritage Dictionary, WordNet, Wiktionary and GCIDE. Wordnik is the world's biggest online English dictionary, by number of words.<br/>Wordnik provides ${wordnikAPI} to request data and they have a ${freePlane} (100 requests/hour), which is the plane MDSearch is using.`
    },
    {
        name:'Datamuse',
        url:'https://datamuse.com/',
        desc: `Datamuse is a collection of websites (OneLook, RhymeZone and other), mobile apps, and APIs designed to help people create and communicate more effectively.
        The ${datamuseApi} is a lexical search service for developers. The API can help to find words that match a given set of constraints and that are likely in a given context, get definitions, suggestions and more. The MDSearch is using ${datamuseApi} for search “autocomplete” suggesttions.`
    },
];

export const sourcesAr = sourceObjAr.map(obj=>createSourceObj(obj));



