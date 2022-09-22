//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';

//material ui
import {Typography } from '@mui/material';

export function ShowWordnet(){
    const data = useSelector((state)=>state.dicts.wordnet)
    console.log("redux state wordnet", data);

    if (!data?.list){
        return 
    }
    const dictDataAr = data.list.map((obj)=>{
        const partOfSpeech = obj.pos
    return(
        <div key={obj.synsetOffset} className='defBlock'>
            <Typography  variant='defHead' className='defHead'>{obj.lemma} {partOfSpeech ? '('+partOfSpeech+')' : null}</Typography>
            <Typography  variant='defBody' className='defBody'>{obj.def}</Typography>
            {obj.exp.length>0 &&
                <div>
                <p>Examples</p>
                <ul className="divExamples">
                    {obj.exp.map((exp, index)=>{
                        return(
                            <li key={index+'example'+obj.synsetOffset}>
                                <Typography variant='defExamples'> {exp} </Typography >
                            </li>
                        )
                    })}
                </ul>
            </div>
            }               
            {obj.synonyms.length>1 &&
                <div>
                    <p>Synonyms</p>
                    <ul>
                        {obj.synonyms.map((syn, index)=>{
                            const synonym = syn.replaceAll('_', ' ')
                            if(obj.lemma!==synonym){
                                return(
                                    <li key={index+'synonym'+obj.synsetOffset}>
                                        {synonym}
                                    </li>
                                ) 
                            }
                        })}
                    </ul>
                </div>
            }
        </div>
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