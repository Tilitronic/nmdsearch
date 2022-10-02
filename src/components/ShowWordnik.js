//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import xml2js from "xml2js";
const xmlparser = new xml2js.Parser();

import { TextResultUnit } from './TextResultUnit/TextResultUnit';


import {Typography, Box, Button, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function makeALink(phrase, link){
    return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`
}

function Definitions(){
    const data = useSelector((state)=>state.dicts.wordnik)
    if(!data?.definitions){
        return
    }
    const defData = useSelector((state)=>state.dicts.wordnik.definitions)

    const reactElementsAr = defData.map((origin, index)=>{
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
                    key={'wordnikDefType'+typeOfDef.id}
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
        if(origin.source!=='wordnet'){
            return (
                <TextResultUnit
                    key={'wordnikSource'+origin.url}
                    // color='white'
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

function Audio (){
    const data = useSelector((state)=>state.dicts.wordnik)
    if (!data.audio){return}
    const audioElements=data.audio.map(obj=>{
        const fileUrl = obj.fileUrl
        function handleClick(id, url){
            if (window.event.ctrlKey) {
                console.log("url", url);
                window.open(url, '_blank');
                return
            }
            const audioEl = document.getElementById(id)
            audioEl.play()
        }
        return(
            <div key={obj.id}>
                <IconButton  
                    title={obj.attributionText+'. Ctrl+click to see original source'}
                    onClick={()=>handleClick(obj.id, obj.attributionUrl)}
                    
                >
                    <PlayCircleIcon color="iconButton"/>
                </IconButton>
                <audio id={obj.id}>
                    <source src={fileUrl} type='audio/mpeg'/>
                    Your browser does not support the audio element.
                </audio>
            </div>
        )
    })
    return(
        <Box className="audioElements" sx={{display: 'flex', flexDirection: 'row'}}>
            {audioElements}
        </Box>
    )
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
                <Box sx={{display: 'flex', flexDirection: 'row', paddingLeft: '10px', alignItems: 'center'}}>
                    <Prononuc/>
                    <Audio/>
                </Box>

                {data.definitions && <Definitions/>}

            </div>
        )
    }
    return null

    
}