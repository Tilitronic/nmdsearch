//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';

import { Togglable } from './Togglable';
import { TextResultUnit } from './TextResultUnit/TextResultUnit';

//material ui
import {Typography, Accordion, AccordionDetails, AccordionSummary, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function TextAccordion({children, name, color='primary'}){

    return(
        <Accordion
        sx={{
            borderLeft: 3,
            borderColor: 'synBBC'
        }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon color={color} fontSize='10px'/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography 
                variant='synonimsHead'
            >
                {name}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div>
                {children}
            </div>             
        </AccordionDetails>
    </Accordion>
    )
}

export function ShowWordnet(){
    const data = useSelector((state)=>state.dicts.wordnet)
    console.log("redux state wordnet", data);

    if (!data?.list){
        return 
    }
    const dictDataAr = data.list.map((obj)=>{
        const partOfSpeech = obj.pos

        const uniqueSynonims = obj.synonyms.filter((syn)=>syn!==obj.lemma)
        const synonymsElements = uniqueSynonims.map((syn, index)=>{
            const synonym = syn.replaceAll('_', ' ')
                return(
                    <div key={index+'synonym'+obj.synsetOffset}>
                        {synonym}
                    </div>
                ) 
            
        })
        const examplesElements = obj.exp.map((exp, index)=>{
            return(
                <div key={index+'example'+obj.synsetOffset}>
                    <Typography variant='defExamples'> {exp} </Typography >
                </div>
            )
        })

        return(
            <TextResultUnit
                        color='bodyBBC'
                        key={obj.synsetOffset}
                        className='defBlock'
                        head={
                            <Typography  variant='defHead' className='defHead'>
                                {obj.lemma} {partOfSpeech ? '('+partOfSpeech+')' : null}
                            </Typography>
                        }
                        type='1'
                        expanded={true}
                    >
                
                <Box
                    // sx={{
                    //     borderLeft: 5,
                    //     borderColor: 'defBBC'
                    // }}
                    className='defBody'
                >
                    <Typography  variant='defBody' >
                        {obj.def}
                    </Typography>
                </Box>
                {obj.exp.length>0 &&
                <TextResultUnit
                    color='exampBBC'
                    className='defExamples'
                    head='Examples'
                    type='2'
                    expanded={true}
                >
                <div className="divExamples">
                        {examplesElements}
                    </div>          
                </TextResultUnit>
                }               
                {obj.synonyms.length>1 &&
                    <TextResultUnit
                        color='synBBC'
                        className='defSynonyms'
                        head={'Synonyms ('+synonymsElements.length+')'}
                        type='2'
                        expanded={false}
                    >
                            <div>
                                {synonymsElements}
                            </div>             
                    </TextResultUnit>
                }
            </TextResultUnit>
        )
        })
    return(
        <div>
            <div>
                {dictDataAr}
            </div>
            
        </div>
        )
    
}