import {sourcesAr} from '../dicts.js';
import parse from 'html-react-parser';

export function Sources(){
    
    return(
      sourcesAr.map(obj=>
        <li className='source' key={obj.id}>
          <h3><a href={obj.url} target="_blank" rel="noreferrer noopener">{obj.name}</a></h3>
          <p>{parse(obj.desc)}</p>
        </li>)
    )
   
  }