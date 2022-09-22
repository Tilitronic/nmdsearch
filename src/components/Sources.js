import {sourcesAr} from '../data/dicts.js';
import parse from 'html-react-parser';

export function SourcesData(){
    
    return(
      sourcesAr.map(obj=>
        <li className='source' key={obj.id}>
          <p><a href={obj.url} target="_blank" rel="noreferrer noopener">{obj.name}</a></p>
          <p>{parse(obj.desc)}</p>
        </li>)
    )
   
  }

export function Sources(){
  
  return(
    <ul>
      <SourcesData/>
    </ul>
  )
}