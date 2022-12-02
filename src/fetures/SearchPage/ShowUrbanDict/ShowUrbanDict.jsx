import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { TextResultUnit } from '../../../components/TextResultUnit';

function makeALink(phrase, link){
  return parse(`<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`);
}

export function ShowUrbanDict(){
  const data = useSelector((state) => state.dicts.urban);
  console.log('redux state urban', data);

  const themeName = useSelector((state) => state.parameters.ui.themeCC);
  const classes = ' '+themeName+' '+data.dict+' ';

  if(!data){return null;}

  const definitionsAr = data.list.map((obj) => {
    const url='https://www.urbandictionary.com/define.php?term=';
    let definition = obj.definition;
    let example = obj.example;

    const text1 = obj.definition.match(/\[.*?\]/g);
    if(text1){
      // const text2 = obj.definition.match(/(?<=\[).+?(?=\])/g);
      let text2 = [];
      for (let el of text1){
        const word0 = el;
        const word1 = word0.replaceAll('[', '');
        const word2 = word1.replaceAll(']', '');
        text2.push(word2);
      }
      // console.log('obj.definition', obj.definition);
      // console.log('text1', text1);
      // console.log('text2', text2);
      // console.log("text2t", text2t);
      text1.forEach((element) => definition=definition.replace(element, `<a href="${url+text2[text1.indexOf(element)]}" target="_blank" rel="noreferrer noopener">${text2[text1.indexOf(element)]}</a>`));
      definition=definition.replaceAll('\n', '<br/>');
    }

    const text3 = obj.example.match(/\[.*?\]/g);
    if(text3){
      // const text4 = obj.example.match(/(?<=\[).+?(?=\])/g);
      let text4=[];
      for (let el of text3){
        const word0 = el;
        const word1 = word0.replaceAll('[', '');
        const word2 = word1.replaceAll(']', '');
        text4.push(word2);
      }
      // console.log('obj.example', obj.example);
      // console.log('text3', text3);
      // console.log('text4', text4);
      text3.forEach((element) => example=example.replace(element, `<a href="${url+text4[text3.indexOf(element)]}" target="_blank" rel="noreferrer noopener">${text4[text3.indexOf(element)]}</a>`));
      example=example.replaceAll('\n', '<br/>');
    }

    const key = obj.permalink.split(/ /)[0].replace(/[^\d]/g, '');
    const rawTime0 = obj.written_on.split('T')[0]; //YYYY-MM-DD
    const rawTime1 = rawTime0.split('-');
    const time=rawTime1[2]+'.'+rawTime1[1]+'.'+rawTime1[0];
    return(
      <TextResultUnit
        key={'urbandef'+obj.defid}
        className={'defHead'+classes}
        head={
          <p className={'defHead'+classes}>
            {makeALink(obj.word,obj.permalink)}
          </p>
        }
        // className='defBlock'
        expanded={true}
        type='1'
      >
        <div>

          <p className={'defBody'+classes}>
            {parse(definition)}
          </p>
          {obj.example.length>0 &&
                <TextResultUnit
                  className={'defExamples '+classes}
                  head={<p className={'defExamples '+classes}>{'Examples'}</p>}
                  color='exampBBC'
                  expanded={true}
                  type='2'
                >
                  <p>{parse(example)}</p>
                </TextResultUnit>
          }


          <div className='autAndRate'>
            <p  className='defAut' align='left'>{'by '+obj.author+' '+time+'; rating: '+obj.thumbs_up+'/'+obj.thumbs_down}</p >
          </div>
        </div>
      </TextResultUnit>
    );
  });

  return(
    <div>
      {definitionsAr}
    </div>
  );
}