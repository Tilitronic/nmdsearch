import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';


export function ShowUrbanDictDef () {
    const urban = useSelector((state)=>state.dicts.urban)
    console.log("urban", urban);

    if (urban){
    const definitionsAr = urban.list.map((obj)=>{
      const url='https://www.urbandictionary.com/define.php?term=';
      let definition = obj.definition;
      let example = obj.example;
  
      const text1 = obj.definition.match(/\[.*?\]/g); 
      if(text1){
        const text2 = obj.definition.match(/(?<=\[).+?(?=\])/g);
        console.log("obj.definition", obj.definition);
        console.log("text1", text1);
        console.log("text2", text2);
        text1.forEach((element)=>definition=definition.replace(element, `<a href="${url+text2[text1.indexOf(element)]}" target="_blank" rel="noreferrer noopener">${text2[text1.indexOf(element)]}</a>`));
        definition=definition.replaceAll('\n', '<br/>');
      }
  
      const text3 = obj.example.match(/\[.*?\]/g); 
      if(text3){
        const text4 = obj.example.match(/(?<=\[).+?(?=\])/g);
        console.log("obj.example", obj.example);
        console.log("text3", text3);
        console.log("text4", text4);
        text3.forEach((element)=>example=example.replace(element, `<a href="${url+text4[text3.indexOf(element)]}" target="_blank" rel="noreferrer noopener">${text4[text3.indexOf(element)]}</a>`));
        example=example.replaceAll('\n', '<br/>');
      }
  
      return(  
      <li key={nanoid()}>
        <div><a href={obj.permalink} target="_blank" rel="noreferrer noopener">{obj.word}</a></div>
        <div>{parse(definition)}<br/>{parse(example)}</div>
        <div>{obj.author} {obj.written_on.split('T')[0]}<br/>{obj.thumbs_up}/{obj.thumbs_down}</div>
      </li>)
    }) 
    console.log("definitionsAr", definitionsAr);
    return (
      <div>
        <ul>
          {definitionsAr}
        </ul>
      </div>
    )}
    return null
  }
  