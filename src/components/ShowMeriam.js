import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import { TextResultUnit } from './TextResultUnit/TextResultUnit';

//material ui
import {Typography, Box } from '@mui/material';

function makeALink(phrase, link){
  return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`
}

function sortDataByPos(data){
    let sortedData = {
        noun:[], verb:[],
        pronoun:[],  adjective:[], 
        adverb:[], preposition:[],
        conjunction: [], interjection: [],
        abbreviation:[],  
        other:[]}
    for (let obj of data){
        const pos = obj.fl
        switch (pos) {
            case 'noun':
                sortedData.noun.push(obj)
              break;
            case 'pronoun':
                sortedData.pronoun.push(obj)
                break;
            case 'verb':
                sortedData.verb.push(obj)
                break;
            case 'phrasal verb':
                sortedData.verb.push(obj)
                break;
            case 'intransitive verb':
                sortedData.verb.push(obj)
                break;
            case 'adjective':
                sortedData.adjective.push(obj)
                break;
            case 'adverb':
                sortedData.adverb.push(obj)
                break;
            case 'preposition':
                sortedData.preposition.push(obj)
                break;
            case 'abbreviation':
                sortedData.abbreviation.push(obj)
                break;
            case 'conjunction':
                sortedData.conjunction.push(obj)
                break;
            case 'interjection':
                sortedData.interjection.push(obj)
                break;
            case null:
                sortedData.oth.push(obj)
                break;
            default:
                sortedData.other.push(obj);
          }
    }
    return sortedData
}


function WrongWord({data}){
    const words = data.map((word, index)=>{
        return (
            <Typography key={'mwSug'+index} sx={{paddingRight: '10px'}} className='mwSugggestion'>{word}</Typography>
        )
    })

    return(
        <Box>
            <Typography>Maybe you were looking for some of those words:</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    maxWidth: '400px'
                }}
            >
                {words}
            </Box>
        </Box>
    )
}

function LearnersDefs({data, pos}){
    const query = useSelector((state)=>state.query.query)
    let counter1 = 0
    
    const defElements1 = data.map((obj, index)=>{
        const offensive = obj.meta.offensive
        if(!obj?.meta['app-shortdef']?.def){return}
        const word = obj.meta.id.replaceAll(':1', '')
        if (!word.includes(query.toLowerCase())){return}
        counter1+=1
        let counter2 = 0
        const defAr = obj.meta['app-shortdef'].def
        if (!defAr){return}
        const defElements2 = defAr.map(el=>{
            counter2+=1;
            const text0=el.replaceAll('{it}', '(<i>')
            const text1=text0.replaceAll('{/it}', '</i>)')
            const regexForStrip = /{(.|\n)*?}/ig
            const text2 = text1.replaceAll(regexForStrip, '')
            const text3 = parse(text2)
            return(

                <Typography variant='defBody' key={'mwdef1_'+index+nanoid()}>{parse('<b>'+counter1+'</b>'+'.'+counter2+' '+text2)}</Typography>

            )})
        return(
            <div key={'mwdef2_'+index}>
                {offensive &&  <Box className='offensive' sx={{margin: 0}}>{parse("<p className='offensive'><i>Offencive</i></p>")}</Box>}
                <Box
                    sx={{
                        paddingBottom: '7px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    className='defBody'
                >
                    {defElements2}
                </Box>
                
            </div>
        )
    })
    return(
        <div>
            {counter1>0 && parse('<i>'+pos+'</i>')}
            {defElements1}
        </div>
        
    )
}

function grubDefiniitons(data){
    let defs = []
    const defObj ={
        def: null,
        exp: null,
        sn: null  
      }
    for (let el1 of data){
        // console.log("el1", el1);
        if(!el1.length){continue}
        for (let el2 of el1){
            // console.log("el2", el2);
            if((typeof el2)==='string'){continue}
            if(!el2.length){continue}
            for (let el3 of el2){
                // console.log("el3", el3);
                    if((typeof el3)==='string'){continue}
                    if(!el3?.dt){continue}
                    defObj.sn = el3.sn
                    if(!el3.dt.length){continue}
                    for (let el4 of el3.dt){
                        // console.log("el4", el4);
                        if(el4[0]==='text'){
                            defObj.def=el4[1]
                            console.log("el4[1]", el4[1]);
                        }
                        if(el4[0]==='vis'){
                            defObj.exp=el4[1]
                        }

                    }
                    if (defObj.def){
                        defs.push({...defObj})
                        console.log("defObj.def", defObj.def);
                    }
                    
                } 
                

        }

    }
    console.log("grubDefiniitons", defs);
    return defs
}

function processText(rawText, type='1'){
    let text0
    if (type==='1'){ 
        text0=rawText.replaceAll('{it}', '(<i>')
        text0=text0.replaceAll('{/it}', '</i>)')
        text0=text0.replaceAll('{bc}{sx|', '<b>')
        text0=text0.replaceAll(/\|(.|\n)*?}/ig, '</b>')

    }
    else if (type==='2'){
        text0=rawText.replaceAll('{it}', '<i>')
        text0=text0.replaceAll('{/it}', '</i>')
        text0=text0.replaceAll('{bc}{sx|', '<b>')
        text0=text0.replaceAll('||}', '</b>')
    }
     
    console.log("text0", text0);
    const text1=text0
    const regexForStrip = /{(.|\n)*?}/ig
    const text2 = text1.replaceAll(regexForStrip, '')
    const result = text2
    console.log("processText", result);
    return result
}

function DetailedDefs({data, pos, filter=true}){
    const query = useSelector((state)=>state.query.query)
    let counter1 = 0
    
    const defElements1 = data.map((obj, index)=>{
        const word = obj.meta.id
        if(filter && !word.includes(query.toLowerCase())){return}
        const offensive = obj.meta.offensive
        if(!obj?.def){return}
        if(!obj?.def[0]){return}
        if(!obj?.def[0].sseq){return}
        counter1+=1
        let counter2 = 0
        let vd = null
        if (obj.def[0]?.vd){vd=obj.def[0].vd}

        const defAr = grubDefiniitons(obj.def[0].sseq)
        
        if (!defAr.length){return}
        const defElements2 = defAr.map(el=>{
            counter2+=1;

            const text = processText(el.def)
            let example = null
            let examples = []
            if(el.exp){
                if((typeof el.exp)==='string'){example=processText(el.exp, '2')}
                else if (el.exp.length>0){
                examples=el.exp.map((obj, index)=>{
                    const text=processText(obj.t, '2')
                    return(
                        <Typography key={counter1+'_'+counter2} variant='defExamples'>{parse(text)}</Typography>
                    )
                })
            }
            }
            
            return(
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant='defBody' key={'mwdef1_'+index+nanoid()}>{parse('<b>'+counter1+'</b>'+'.'+counter2+' '+text)}</Typography>

                    {example && <Typography variant='defExamples' className='defExamples'>{example}</Typography>}
                    {examples.length>0 && <Box className='defExamples'>{examples[0]}</Box>}
                    {examples.length>1 &&
                    <TextResultUnit
                        type="2"
                        expanded={false}
                        color='exampBBC'
                        head={"show more examples ("+(examples.length-1)+")"}
                        className='defExamples'
                    >
                        {examples.slice(1)}
                    </TextResultUnit>
            }

                </Box>

            )})
        return(
            <div key={'mwdef2_'+index}>
                {offensive &&  parse("<p className='offensive'><i>Offencive</i></p>")}
                <Box
                    sx={{
                        paddingBottom: '7px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    className='defBody'
                >
                    {defElements2}
                </Box>
                
            </div>
        )
    })
    return(
        <div>
            {counter1>0 && parse('<i>'+pos+'</i>')}
            {defElements1}
        </div>
        
    )
}

function Pronounc ({data}){
    let word = null
    let transcription = null
    for (let obj of data){
        if(obj?.hwi?.prs){
            if(obj.hwi?.prs[0]?.ipa){
            transcription=obj.hwi.prs[0].ipa
            }
            else if(obj.hwi?.prs[0]?.mw) {
                transcription=obj.hwi.prs[0].mw
            }
            if(obj.hwi?.hw){
                if((typeof obj.hwi.hw) ==='string'){
                    word = obj.hwi.hw
                }
            }
            if((typeof transcription)==='string'){
                break
            }
            
        }
    }
    const url = 'https://www.merriam-webster.com/dictionary/'+word
    return(
        <div>
            <Typography className='defHead' variant='defHead'>{parse(makeALink(word, url)+' '+'/'+transcription+'/')}</Typography>
        </div>
        
    )

}

function ShowLearners(){
    const dictState=useSelector(state=>state.dicts.meriamL)
    console.log("Meriam-Webster redux store: ", dictState);
    if(!dictState){return}
    if(!dictState?.data?.learners){return}
    if(typeof(dictState.data.learners[0])==='string'){
        return <WrongWord data={dictState.data.learners}/>
    }
    const data = dictState.data.learners
    const sortedData=sortDataByPos(data)
    console.log("sortedData", sortedData);



    const elementsAr = Object.keys(sortedData).map((key, index)=>{
        if (sortedData[key].length===0){return}
        return (
            <div>
                {/* <LearnersDefs className={'mw_'+key} key={'shortDefWrapper'+index} data={sortedData[key]} pos={key}/>
                <Typography>??????</Typography> */}
                <DetailedDefs className={'mw_'+key} key={'shortDefWrapper'+index} data={sortedData[key]} pos={key}/>

            </div>
        )
    })

    return(
        <dic>
            <Pronounc data={data}/>
            {elementsAr}
        </dic>
    )

}

function ShowCollegiate(){
    const dictState=useSelector(state=>state.dicts.meriamC)
    console.log("Meriam-Webster redux store: ", dictState);
    if(!dictState){return}
    if(!dictState?.data?.collegiate){return}
    if(typeof(dictState.data.collegiate[0])==='string'){
        return <WrongWord data={dictState.data.collegiate}/>
    }
    const data = dictState.data.collegiate
    const sortedData=sortDataByPos(data)
    console.log("sortedData", sortedData);



    const elementsAr = Object.keys(sortedData).map((key, index)=>{
        if (sortedData[key].length===0){return}
        return (
            <div>
                <DetailedDefs className={'mw_'+key} key={'shortDefWrapper'+index} data={sortedData[key]} pos={key} filter={false}/>
            </div>
        )
    })

    return(
        <dic>
            <Pronounc data={data}/>
            {elementsAr}
        </dic>
    )

}

export function ShowMeriamWebsterL(){
    const dictState=useSelector(state=>state.dicts.meriamL)
    // console.log("Meriam-Webster redux store: ", dictState);
    if(!dictState){return}
    if(!dictState?.data){return}

    return(
        <dic>
            <ShowLearners/>
        </dic>
    )
    

}

export function ShowMeriamWebsterC(){
    const dictState=useSelector(state=>state.dicts.meriamC)
    // console.log("Meriam-Webster redux store: ", dictState);
    if(!dictState){return}
    if(!dictState?.data){return}

    return(
        <dic>
            <ShowCollegiate/>
        </dic>
    )
    

}