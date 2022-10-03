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
    const parametres = useSelector(state=>state.parametres)
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
                const regexForStripHTML = /<(.|\n)*?>/ig
                const stripText = xmlDefText.replaceAll(regexForStripHTML, '')
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
                                {index+1+'. '+parse(stripText)}
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
        const expanded = origin.source==='wordnet' ? !parametres.wordnet.checked && !parametres.babelnet.checked : true

        // if(parametres.wordnet.checked===true && origin.source!=='wordnet')
        return (
            <TextResultUnit
                key={'wordnikSource'+origin.url}
                // color='white'
                className='dictBody'
                head={parse(originLink)}
                type='1'
                expanded={expanded}
            > 
                <div className="definitions">
                    {definitionsElements}
                </div>
            </TextResultUnit>
            
        )
        
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
    function handleClick(url){
        if (window.event.ctrlKey) {
            window.open(url, '_blank');
            return
        }
    }
    const pronData = useSelector((state)=>state.dicts.wordnik.pronunciations)
    function getIpa(ar){
        for(let obj of ar){
            if(obj.rawType==='IPA'){
                return obj
            }
        }
    }
    const ipa = getIpa(pronData)
    if (!ipa?.raw){return}
    return(
        <div title={ipa.attributionText+' Ctrl+click to see license'} onClick={()=>handleClick(ipa.attributionUrl)}>{ipa.raw}</div>
    )
}

function Audio (){
    const data = useSelector((state)=>state.dicts.wordnik)
    if (!data.audio){return}
    const audioElements=data.audio.map(obj=>{
        const fileUrl = obj.fileUrl
        function handleClick(id, url){
            if (window.event.ctrlKey) {
                window.open(url, '_blank');
                return
            }
            const audioEl = document.getElementById(id)
            audioEl.play()
        }
        return(
            <div key={obj.id}>
                <IconButton  
                    title={obj.attributionText.replaceAll('--', '—')+'. Ctrl+click to see original source'}
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