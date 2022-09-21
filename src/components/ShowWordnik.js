//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import xml2js from "xml2js";
const xmlparser = new xml2js.Parser();

import {Typography } from '@mui/material';

function makeALink(phrase, link){
    return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`
}
function sortDefinitions (origins, definitions){
    for (let def of definitions){
        for(let origin of origins){
            if(def.sourceDictionary===origin.id && def.text){
                origin.definitions.push(def)
            }
        }
    }
}

function Definitions(){
    const data = useSelector((state)=>state.dicts.wordnik.definitions)
    if(data){
        const defOrigins = data.map((obj)=>{return({name: obj.attributionText, source: obj.sourceDictionary, url: obj.attributionUrl, id: obj.sourceDictionary, definitions: []})})
        console.log("defOrigins", defOrigins);
        const uniqDefOrigins = [...new Map(defOrigins.map((item) => [item["id"], item])).values()];
        console.log("uniqDefOrigins", uniqDefOrigins);
        sortDefinitions(uniqDefOrigins, data)

        const reactElementsAr = uniqDefOrigins.map((origin, index)=>{
            const originTitle = origin.name
            const originLink = makeALink(origin.name, origin.url)
            const definitionsAr = origin.definitions.map((obj, index)=>{
                const word = makeALink(obj.word, obj.wordnikUrl)
                const attribution = makeALink(obj.attributionText, obj.attributionUrl)
                const xmlDefText = obj.text
                // console.log("xmlDefText", xmlDefText);
                const n1text = xmlDefText.replaceAll('xref', 'span')
                const n2text = n1text.replaceAll('spn', 'span')
                // console.log("n1text", n2text);
                // const parsedText = xmlparser.parseString(
                //     xmlDefText, function(err, result) {
                //         result
                //     })
                // console.log("parsedText", parsedText);
                const partOfSpeech = obj.partOfSpeech
                return(
                    <div className='defBlock' key={obj.id ? obj.id : "wordnetDef"+obj.sourceDictionary+index}>
                        
                        <Typography  variant='defHead' className='defHead'>{parse(word)} {partOfSpeech ? '('+partOfSpeech+')' : null}</Typography >
                        <Typography variant='defBody' className='defBody'>{
                        parse(n2text)
                        }</Typography >
                        {/* <div>{parse(attribution)}</div> */}
                    </div>
                )
            })
            if(origin.source!=='wordnet'){
                return (
                    <div key={'wordnikDef'+origin.url} className='dictName'>   
                        <div>
                            {parse(originLink)}
                        </div>
                        <div className="definitions">
                            {definitionsAr}
                        </div>
                    </div>
                    
                )
            }
            return null
            
        })
        
            

        return(
            <div>
                {reactElementsAr}
            </div>
                

            
        )
    }
    return null
}

function Prononuc(){
    const data = useSelector((state)=>state.dicts.wordnik.pronunciations)
    if(data){
        const pronunciations = data.map((obj, index)=>{
            if(obj.rawType==='IPA'){

        return(
            <div key={'wordnikIpa'+index}>{obj.raw}</div>
        )}})
        console.log("pronunciations", pronunciations);
        if(pronunciations){
            return(
                <div>
                    {pronunciations}
                </div>
            )
        }
        return null
    }
    return null
}

export function ShowWordnik(){
    const data = useSelector((state)=>state.dicts.wordnik)


    
    
    console.log("redux state wordnik", data);
    if(data){
        return (
            <div>
                <Prononuc/>
                {data.definitions && <Definitions/>}

            </div>
        )
    }
    return null

    
}