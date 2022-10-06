import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import { TextResultUnit } from './TextResultUnit/TextResultUnit';

//material ui
import {Typography, Box } from '@mui/material';

function makeALink(phrase, link){
  return parse(`<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`)
}

export function ShowUrbanDictDef () {
    const urban = useSelector((state)=>state.dicts.urban)
    console.log("redux state urban", urban);

    if (urban){
    const definitionsAr = urban.list.map((obj)=>{
      const url='https://www.urbandictionary.com/define.php?term=';
      let definition = obj.definition;
      let example = obj.example;
  
      const text1 = obj.definition.match(/\[.*?\]/g); 
      if(text1){
        // const text2 = obj.definition.match(/(?<=\[).+?(?=\])/g);
        let text2 = []
        for (let el of text1){
          const word0 = el
          const word1 = word0.replaceAll('[', '')
          const word2 = word1.replaceAll(']', '')
          text2.push(word2)
        }
        console.log("obj.definition", obj.definition);
        console.log("text1", text1);
        console.log("text2", text2);
        // console.log("text2t", text2t);
        text1.forEach((element)=>definition=definition.replace(element, `<a href="${url+text2[text1.indexOf(element)]}" target="_blank" rel="noreferrer noopener">${text2[text1.indexOf(element)]}</a>`));
        definition=definition.replaceAll('\n', '<br/>');
      }
  
      const text3 = obj.example.match(/\[.*?\]/g); 
      if(text3){
        // const text4 = obj.example.match(/(?<=\[).+?(?=\])/g);
        let text4=[]
        for (let el of text3){
          const word0 = el
          const word1 = word0.replaceAll('[', '')
          const word2 = word1.replaceAll(']', '')
          text4.push(word2)
        }
        console.log("obj.example", obj.example);
        console.log("text3", text3);
        console.log("text4", text4);
        text3.forEach((element)=>example=example.replace(element, `<a href="${url+text4[text3.indexOf(element)]}" target="_blank" rel="noreferrer noopener">${text4[text3.indexOf(element)]}</a>`));
        example=example.replaceAll('\n', '<br/>');
      }

      const key = obj.permalink.split(/ /)[0].replace(/[^\d]/g, '')
      const rawTime0 = obj.written_on.split('T')[0] //YYYY-MM-DD
      const rawTime1 = rawTime0.split('-')
      const time=rawTime1[2]+'.'+rawTime1[1]+'.'+rawTime1[0]
      return(  
        <TextResultUnit 
          key={'urbandef'+obj.defid}
          head={
          <Typography  variant='defHead' className='defHead'>
            {makeALink(obj.word,obj.permalink)}
          </Typography >
          } 
          color='bodyBBC' 
          // className='defBlock'
          expanded={true} 
          type='1'
        >
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            
            <Typography  
              variant='defBody' 
              className='defBody' 
            >
              {parse(definition)}
            </Typography >
            {obj.example.length>0 &&
              <TextResultUnit 
              className='defExamples'
              head='Examples'
              color='exampBBC' 
              expanded={true} 
              type='2'
              >
                <Typography variant='defExamples' >{parse(example)}</Typography >
              </TextResultUnit>
            }
            

            <Box className='autAndRate'
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant='defAut' className='defAut' align='right'>{'by '+obj.author+' '+time+'; rating: '+obj.thumbs_up+'/'+obj.thumbs_down}</Typography >
              {/* <Typography variant='defRate' align='right'>{obj.thumbs_up}/{obj.thumbs_down}</Typography >
              <div></div> */}
            </Box>
          </Box>
        </TextResultUnit>
        )
    }) 
    console.log("urban dict definitionsAr", definitionsAr);
    return (
      <div>
        <div>
          {definitionsAr}
        </div>
      </div>
    )}
    return null
  }
  