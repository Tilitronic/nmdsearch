//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import xml2js from "xml2js";
const xmlparser = new xml2js.Parser();

import { TextResultUnit } from './TextResultUnit/TextResultUnit';


import {Typography, Box } from '@mui/material';


function makeALink(phrase, link){
    return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`
}
function sortDefenitionsBySource (origins, definitions){
    for (let def of definitions){
        for(let origin of origins){
            if(def.sourceDictionary===origin.id && def.text){
                origin.definitions.push(def)
            }
        }
    }
}

function sortDefinitionsByPartOfSpeach(data){
    for(let source of data){
        const typesOfDefs = source.definitions.map((item)=>{return({id: item.word+'_'+item.partOfSpeech, word: item.word, partOfSpeech: item.partOfSpeech, url: item.wordnikUrl, sourceDictionary: item.sourceDictionary, definitions: []})})
        const uniqueTypesOfDefs = [...new Map(typesOfDefs.map((item) => [item["id"], item])).values()]
        // console.log("uniqueTypesOfDefs", uniqueTypesOfDefs);
        for (let def of source.definitions){
            for(let defType of uniqueTypesOfDefs){
                if (def.word+'_'+def.partOfSpeech===defType.id){
                    defType.definitions.push(def)
                }
            }
        }
        source.typesOfDefinitions.push(...uniqueTypesOfDefs)
    }
}

function Definitions(){
    const data = useSelector((state)=>state.dicts.wordnik)
    if(!data?.definitions){
        return
    }
    const defData = useSelector((state)=>state.dicts.wordnik.definitions)

    const defOrigins = defData.map((obj)=>{return({name: obj.attributionText, source: obj.sourceDictionary, url: obj.attributionUrl, id: obj.sourceDictionary, definitions: [], typesOfDefinitions: []})})
    console.log("defOrigins", defOrigins);
    const uniqDefOrigins = [...new Map(defOrigins.map((item) => [item["id"], item])).values()];
    console.log("uniqDefOrigins", uniqDefOrigins);
    sortDefenitionsBySource(uniqDefOrigins, defData)
    const testdata = [...uniqDefOrigins]
    sortDefinitionsByPartOfSpeach(testdata)


    const reactElementsAr = uniqDefOrigins.map((origin, index)=>{
        const originTitle = origin.name
        const originLink = makeALink(originTitle, origin.url)
        const definitionsElements = origin.typesOfDefinitions.map(typeOfDef=>{
            const defRawTitle = typeOfDef.word+' ('+typeOfDef.partOfSpeech+')'
            const defTitle = makeALink(defRawTitle, typeOfDef.url)

            const definitionsAr = typeOfDef.definitions.map((obj, index)=>{
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
                    <Box 
                        key={obj.id ? obj.id : "wordnikDef"+obj.sourceDictionary+index}
                        // className='defBody'
                        sx={{
                            paddingLeft: '7px',
                        }}
                    >
                        <Box className='defBody'>
                            <Typography variant='defBody'>
                                {index+1+'. '+parse(n2text)}
                            </Typography >
                        </Box>
                    </Box>
                )})
            
            return(
                <TextResultUnit
                    color="white"
                    type='1'
                    expanded={true}
                    head={
                        <Box className='defHead'>
                            <Typography variant="defHead">
                                {parse(defTitle)}
                            </Typography>
                        </Box>
                    }
                >
                    {definitionsAr}
                </TextResultUnit>
            )
        })
        // const definitionsAr = origin.definitions.map((obj, index)=>{
        //     const word = makeALink(obj.word, obj.wordnikUrl)
        //     const attribution = makeALink(obj.attributionText, obj.attributionUrl)
        //     const xmlDefText = obj.text
        //     // console.log("xmlDefText", xmlDefText);
        //     const n1text = xmlDefText.replaceAll('xref', 'span')
        //     const n2text = n1text.replaceAll('spn', 'span')
        //     // console.log("n1text", n2text);
        //     // const parsedText = xmlparser.parseString(
        //     //     xmlDefText, function(err, result) {
        //     //         result
        //     //     })
        //     // console.log("parsedText", parsedText);
        //     const partOfSpeech = obj.partOfSpeech
        //     return(
        //         <Box 
        //             key={obj.id ? obj.id : "wordnetDef"+obj.sourceDictionary+index}
        //             // className='defBody'
        //             sx={{
        //                 paddingLeft: '7px',
        //             }}
        //         >
        //             <Box className='defHead'>
        //                 <Typography  variant='defHead'>
        //                         {parse(word)} {partOfSpeech ? '('+partOfSpeech+')' : null}
        //                 </Typography >
        //             </Box>
        //             <Box className='defBody'>
        //                 <Typography variant='defBody'>
        //                     {parse(n2text)}
        //                 </Typography >
        //             </Box>
        //         </Box>
        //     )})
        if(origin.source!=='wordnet'){
            return (
                <TextResultUnit
                    key={'wordnikDef'+origin.url}
                    color='white'
                    className='dictBody'
                    head={parse(originLink)}
                    type='1'
                    expanded={true}
                > 
                    <div className="definitions">
                        {definitionsElements}
                    </div>
                </TextResultUnit>
                
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

function Prononuc(){
    const data = useSelector((state)=>state.dicts.wordnik)
    if(!data?.pronunciations){
        return
    }
    const pronData = useSelector((state)=>state.dicts.wordnik.pronunciations)

        const pronunciations = pronData.map((obj, index)=>{
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

export function ShowWordnik(){
    const data = useSelector((state)=>state.dicts.wordnik)
    if(!data){
        return
    }  
    
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