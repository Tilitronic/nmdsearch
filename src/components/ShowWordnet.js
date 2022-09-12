//redux store
import { useSelector } from "react-redux"
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';

export function ShowWordnet(){
    const data = useSelector((state)=>state.dicts.wordnet)
    console.log("redux state wordnet", data);
    if (data){
        const definitionsAr = data.list.map((obj)=>{
        return(
            <li key={obj.synsetOffset}>
                <div>{obj.lemma} {'('}{obj.pos}{')'}</div>
                <div>{obj.def}</div>
                {obj.exp.length>0 &&
                    <div>
                    <p>Examples</p>
                    <ul>
                        {obj.exp.map((exp, index)=>{
                            return(
                                <li key={obj.synsetOffset+index}>
                                    {exp}
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
                            {obj.synonyms.map((syn)=>{
                                const synonym = syn.replaceAll('_', ' ')
                                if(obj.lemma!==synonym){
                                    return(
                                        <li key={nanoid()}>
                                            {synonym}
                                        </li>
                                    ) 
                                }
                            })}
                        </ul>
                    </div>
                }
            </li>
        )
        })
        return(
            <div>
                <ul>
                    {definitionsAr}
                </ul>
                
            </div>
            )
    }
    return null
    
}