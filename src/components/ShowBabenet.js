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

function Synsets (){
    const data = useSelector((state)=>state.dicts.babelnet)
    console.log("babelnet data", data);
    if (!data?.list){return}
    const elements = useSelector((state)=>state.dicts.babelnet.list)
    
    const synsets = elements.map((synset)=>{
        const definitions = synset.glosses.map((def, index)=>{
            return(
                <Typography key={'def'+def.sourceSense+index}>{index+'. '}{def.gloss}</Typography>
            )
        })
        const examples = synset.examples.map((def, index)=>{
            return(
                <Typography key={'example'+def.sourceSense+index}>{def.example}</Typography>
            )
        })
        return(
            <div key={synset.id}>
                {definitions}
                {examples}
            </div>
        )
    })

        return synsets

    


    return(
        null
    )
}

export function ShowBabelnet(){
    const data = useSelector((state)=>state.dicts.babelnet)

    if(data){
        return (
            <div>
                <Synsets/>
            </div>
        )
    }
    return null

    
}