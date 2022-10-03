//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import xml2js from "xml2js";
const xmlparser = new xml2js.Parser();

import {Typography, Box } from '@mui/material';
import { TextResultUnit } from './TextResultUnit/TextResultUnit';

function makeALink(phrase, link){
    return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`
}

function SortedBySource(){
    const dictState = useSelector((state)=>state.dicts.babelnet)
    console.log("BabelNet redux store", dictState);
    if(!dictState?.data){return}
    const elementsAr = Object.keys(dictState.data.sortedBySource).map(key=>{
        const obj=dictState.data.sortedBySource[key]
        if (!obj){return}

        const synsets = obj.map((synset, index)=>{

            return(
                <div key={synset.pos+index}>
                    <Typography>
                        {index+1+'. ('+synset.pos.toLowerCase()+') '+synset.gloss}
                    </Typography>
                </div>
            )
        })

        return (
            <div key={obj[0].source}>
                <Typography>{obj[0].source}</Typography>
                {synsets}
            </div>
            
        )
    })
    return elementsAr
}
const sources = ["WN", 'WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WIKT', 'WIKTLB']
const sources0 = ['WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WIKT', 'WIKTLB']
const sources1 = ['WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WN']
const sources2 = ['WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WIKTLB']

function Defs({data, domain=null}){
    const parametres = useSelector((state)=>state.parametres)
    let counter = 0
    const elementsAr = data.map((obj, index)=>{
        let sourcesList = sources
        if (parametres.wordnet.checked){sourcesList=sources0}
        if (parametres.wordnik.checked){sourcesList=sources1}
        if (parametres.wordnik.checked && parametres.wordnet.checked){sourcesList=sources2}

        if(!sourcesList.includes(obj.source)){return}
        counter +=1
        
        return(
            <Box key={obj.source+index} >
                <Typography className="defBody">{counter+'. '+obj.gloss}
                <span className='babelnetDefSource'>{' ('+obj.source+')'}</span>
                </Typography>
                 
            </Box>
        )
    }) 
    const filteredElementsAr = elementsAr.filter(obj=>obj!==undefined)

    const length = filteredElementsAr.length
    return (
        <div>
            {length>0 && <Typography fontSize={12}>{domain}</Typography>}
            {filteredElementsAr[0]}
            {length>1 &&
                <TextResultUnit
                    type="2"
                    expanded={false}
                    color='defBBC'
                    head={"show more definiitons ("+(length-1)+")"}
                    className='defMoreDef'
                >
                {filteredElementsAr.slice(1)}
                </TextResultUnit>
            }
            
        </div>
    )
}

function Examples({data}){
    
    if(!data.length){return}
    const parametres = useSelector((state)=>state.parametres)
    const examplesAr = data.map((obj, index)=>{
        const sourcesList = parametres.wordnet.checked ? sources0 : sources
        if(!sourcesList.includes(obj.source)){return}
        return(
            <Typography>{index+1+'. '+obj.example+' ('+obj.source+')'}</Typography>
        )
    })
    const filtredExamples = examplesAr.filter(obj=>obj!==undefined)
    if(filtredExamples.length<1){return}
    return (
        <TextResultUnit
            key='babelnetExamples'
            head={'Examples ('+filtredExamples.length+')'}
            color='exampBBC'
            type="2"
            expanded={false}
            className='defExamples'
        >
            {filtredExamples}
        </TextResultUnit>
    )
        
}



function SortedByPos(){
    const dictState = useSelector((state)=>state.dicts.babelnet)
    console.log("BabelNet redux store", dictState);
    if(!dictState?.data){return}
    const elementsAr = Object.keys(dictState.data.sortedByPos).map(key=>{   
        if(!dictState.data.sortedByPos[key][0]){return}
        const obj=dictState.data.sortedByPos[key]
        let synsets
        if(key==='noun'){
            const nouns = {other: [], named: [] } 
            for (let el of obj){
                if (el.synsetType==='NAMED_ENTITY'){nouns.named.push(el)}
                else{nouns.other.push(el)}
            }
            console.log("nouns", nouns);
            const otherAr = nouns.other.map((synset, index)=>{
                let domain = null
                if (synset?.domains){
                    domain = Object.keys(synset.domains)[0]
                    
                }
                if (typeof(domain)==='string'){
                    domain = domain.replaceAll('_', ' ')
                }
                    return(
                        <div key={synset.id}>
                            <Defs data={synset.glosses} domain={domain}/>
                            <Examples data={synset.examples}/>
                        </div>
                    )
                })
            const namedAr = nouns.named.map((synset, index)=>{
                let domain = null
                if (synset?.domains){
                    domain = Object.keys(synset.domains)[0]
                    
                }
                if (typeof(domain)==='string'){
                    domain = domain.replaceAll('_', ' ')
                }
                    return(
                        <div key={synset.id}>
                            <Defs data={synset.glosses} domain={domain}/>
                            <Examples data={synset.examples}/>
                        </div>
                    )
                })
            return (
                
                <TextResultUnit
                    head={<Typography> {key} </Typography>}
                    type='1'
                    color='color2'
                    expanded={true}
                >
                    <div className="babelnetNouns">
                        {otherAr}
                        <TextResultUnit
                            head={"Named entities"}
                            type='2'
                            color='color2'
                            expanded={false}
                        >
                            {namedAr}
                        </TextResultUnit>
                    </div>
                </TextResultUnit>  
                    

            )

        }
        else{
            synsets = obj.map((synset, index)=>{
                let domain = null
                if (synset?.domains){
                    domain = Object.keys(synset.domains)[0]
                    
                }
                if (typeof(domain)==='string'){
                    domain = domain.replaceAll('_', ' ')
                }
                    return(
                        <div key={synset.id}>
                            <Defs data={synset.glosses} domain={domain}/>
                            <Examples data={synset.examples}/>
                        </div>
                    )
                })
        } 
        
        
        return(
            <div key={key}>
                <TextResultUnit
                    head={<Typography> {key} </Typography>}
                    type='1'
                    color='color2'
                    expanded={true}
                >
                    {synsets}
                </TextResultUnit>    
            </div>
        )
    })

    return elementsAr
}

function Synsets (){
    const data = useSelector((state)=>state.dicts.babelnet)
    console.log("babelnet data", data);
    if (!data?.data){return}
    const synsets = data.raw.map((synset)=>{
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
}

export function ShowBabelnet(){
    const data = useSelector((state)=>state.dicts.babelnet)
    if(!data){return}
        return (
            <div>
                <SortedByPos/>
            </div>
        )
    }  
