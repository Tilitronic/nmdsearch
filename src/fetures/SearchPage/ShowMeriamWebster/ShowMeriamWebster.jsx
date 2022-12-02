import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

import { TextResultUnit } from '../../../components/TextResultUnit';

function makeALink(phrase, link){
  return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`;
}

function sortDataByPos(data){
  let sortedData = {
    noun:[], verb:[],
    pronoun:[],  adjective:[],
    adverb:[], preposition:[],
    conjunction: [], interjection: [],
    abbreviation:[],
    other:[] };
  for (let obj of data){
    const pos = obj.fl;
    switch (pos) {
    case 'noun':
      sortedData.noun.push(obj);
      break;
    case 'pronoun':
      sortedData.pronoun.push(obj);
      break;
    case 'verb':
      sortedData.verb.push(obj);
      break;
    case 'phrasal verb':
      sortedData.verb.push(obj);
      break;
    case 'intransitive verb':
      sortedData.verb.push(obj);
      break;
    case 'adjective':
      sortedData.adjective.push(obj);
      break;
    case 'adverb':
      sortedData.adverb.push(obj);
      break;
    case 'preposition':
      sortedData.preposition.push(obj);
      break;
    case 'abbreviation':
      sortedData.abbreviation.push(obj);
      break;
    case 'conjunction':
      sortedData.conjunction.push(obj);
      break;
    case 'interjection':
      sortedData.interjection.push(obj);
      break;
    case null:
      sortedData.oth.push(obj);
      break;
    default:
      sortedData.other.push(obj);
    }
  }
  return sortedData;
}


function WrongWord({ data }){
  const words = data.map((word, index) => {
    return (
      <p key={'mwSug'+index} className='mwSugggestion'>{word}</p>
    );
  });

  return(
    <div>
      <p>Maybe you were looking for some of those words:</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          maxWidth: '400px'
        }}
      >
        {words}
      </div>
    </div>
  );
}

function groupDefinitions(data){
  let defs = [];
  const defObj ={
    def: null,
    exp: null,
    sn: null
  };
  for (let el1 of data){
    // console.log("el1", el1);
    if(!el1.length){continue;}
    for (let el2 of el1){
      // console.log("el2", el2);
      if((typeof el2)==='string'){continue;}
      if(!el2.length){continue;}
      for (let el3 of el2){
        // console.log("el3", el3);
        if((typeof el3)==='string'){continue;}
        if(!el3?.dt){continue;}
        defObj.sn = el3.sn;
        if(!el3.dt.length){continue;}
        for (let el4 of el3.dt){
          // console.log("el4", el4);
          if(el4[0]==='text'){
            defObj.def=el4[1];
            // console.log('el4[1]', el4[1]);
          }
          if(el4[0]==='vis'){
            defObj.exp=el4[1];
          }

        }
        if (defObj.def){
          defs.push({ ...defObj });
          // console.log('defObj.def', defObj.def);
        }

      }


    }

  }
  // console.log('groupDefinitions', defs);
  return defs;
}

function processText(rawText, type='1'){
  let text0;
  if (type==='1'){
    text0=rawText.replaceAll('{it}', '<i>');
    text0=text0.replaceAll('{/it}', '</i>');
    text0=text0.replaceAll('{bc}{sx|', '<b>');
    text0=text0.replaceAll(/\|(.|\n)*?}/ig, '</b>');
    text0=text0.replaceAll('{d_link', '');
    text0=text0.replaceAll(', {sx', '');
    text0=text0.replaceAll('{sx', '');



  }
  else if (type==='2'){
    text0=rawText.replaceAll('{it}', '<i>');
    text0=text0.replaceAll('{/it}', '</i>');
    text0=text0.replaceAll('{bc}{sx|', '<b>');
    text0=text0.replaceAll('||}', '</b>');
  }

  // console.log('text0', text0);
  const text1=text0;
  const regexForStrip = /{(.|\n)*?}/ig;
  const text2 = text1.replaceAll(regexForStrip, '');
  const result = text2;
  // console.log('processText', result);
  return result;
}

function DetailedDefs({ data, pos, filter=true, counter0 }){
  const query = useSelector((state) => state.query.query);
  let counter1 = 0;
  const themeName = useSelector((state) => state.parameters.ui.themeCC);
  const  classes =' '+themeName+' ';
  const defElements1 = data.map((obj, index) => {
    const word = obj.meta.id;
    if(filter && !word.includes(query.toLowerCase())){return;}
    const offensive = obj.meta.offensive;
    if(!obj?.def){return;}
    if(!obj?.def[0]){return;}
    if(!obj?.def[0].sseq){return;}
    counter1+=1;
    let counter2 = 0;
    let counter4 = 0;
    let vd = null;
    if (obj.def[0]?.vd){vd=obj.def[0].vd;}

    const defAr = groupDefinitions(obj.def[0].sseq);

    if (!defAr.length){return;}
    const defElements2 = defAr.map(el => {
      counter2+=1;
      let counter3 = 0;
      const text = processText(el.def);
      let example = null;
      let examples = [];
      if(el.exp){
        if((typeof el.exp)==='string'){example=processText(el.exp, '2');}
        else if (el.exp.length>0){
          examples=el.exp.map((obj) => {
            const text=processText(obj.t, '2');
            counter3+=1;
            return(
              <p key={pos+'_'+counter0+'_'+counter1+'_'+counter2+'_'+counter3}>{parse(text)}</p>
            );
          });
        }
      }
      counter4+=1;
      return(
        <div key={'mwdef1_'+counter0+'_'+counter1+'_'+pos+'_'+index+'_'+counter4}>
          <p>{parse('<b>'+counter1+'</b>'+'.'+counter2+' '+text)}</p>

          {example && <p className={'defExamples'+classes} >{example}</p>}
          {examples.length>0 && <div className={'defExamples main'+classes}>{examples[0]}</div>}
          {examples.length>1 &&
                    <TextResultUnit
                      type="2"
                      expanded={false}
                      head={<p className={'defExamples'+classes}>{'show more examples ('+(examples.length-1)+')'}</p>}
                      className={'defExamples'+classes}
                    >
                      {examples.slice(1)}
                    </TextResultUnit>
          }

        </div>

      );});
    return(
      <div key={'mwdef2_'+index}>
        {offensive &&  parse('<p className=\'offensive\'><i>Offencive</i></p>')}
        <div className={'defBody'+classes}>
          {defElements2}
        </div>

      </div>
    );
  });
  return(
    <div key='mwdef'>
      {counter1>0 && parse('<p><i>'+pos+'</i></p>')}
      {defElements1}
    </div>

  );
}

function Pronounc ({ data }){
  let word = null;
  let transcription = null;
  for (let obj of data){
    if(obj?.hwi?.prs){
      if(obj.hwi?.prs[0]?.ipa){
        transcription=obj.hwi.prs[0].ipa;
      }
      else if(obj.hwi?.prs[0]?.mw) {
        transcription=obj.hwi.prs[0].mw;
      }
      if(obj.hwi?.hw){
        if((typeof obj.hwi.hw) ==='string'){
          word = obj.hwi.hw;
        }
      }
      if((typeof transcription)==='string'){
        break;
      }

    }
  }
  const url = 'https://www.merriam-webster.com/dictionary/'+word;
  return(
    <div>
      <p className='defHead'>{parse(makeALink(word, url)+' '+'/'+transcription+'/')}</p>
    </div>

  );

}

function ShowLearners(){
  const dictState=useSelector(state => state.dicts.meriamL);
  // console.log('Meriam-Webster redux store: ', dictState);
  if(!dictState){return;}
  if(!dictState?.data?.learners){return;}
  if(typeof(dictState.data.learners[0])==='string'){
    return <WrongWord data={dictState.data.learners}/>;
  }
  const data = dictState.data.learners;
  const sortedData=sortDataByPos(data);
  // console.log('Meriam-Webster sortedData', sortedData);

  let counter0 = 0;
  const elementsAr = Object.keys(sortedData).map((key, index) => {
    if (sortedData[key].length===0){return;}
    counter0+=1;
    return (
      <div key={'MWLDetailedDef'+index}>
        <DetailedDefs className={'mw_'+key} key={'shortDefWrapper'+index} data={sortedData[key]} pos={key} counter0={'L'+counter0}/>
      </div>
    );
  });

  return(
    <div>
      <Pronounc data={data}/>
      {elementsAr}
    </div>
  );
}

function ShowCollegiate(){
  const dictState=useSelector(state => state.dicts.meriamC);
  // console.log('Meriam-Webster redux store: ', dictState);
  if(!dictState){return;}
  if(!dictState?.data?.collegiate){return;}
  if(typeof(dictState.data.collegiate[0])==='string'){
    return <WrongWord data={dictState.data.collegiate}/>;
  }
  const data = dictState.data.collegiate;
  const sortedData=sortDataByPos(data);
  // console.log('Meriam-Webster sortedData', sortedData);


  let counter0 = 0;
  const elementsAr = Object.keys(sortedData).map((key, index) => {
    if (sortedData[key].length===0){return;}
    counter0+=1;
    return (
      <div key={'MWCDetailedDef'+index}>
        <DetailedDefs className={'mw_'+key} key={'shortDefWrapper'+index} data={sortedData[key]} pos={key} filter={true} counter0={'C'+counter0}/>
      </div>
    );
  });

  return(
    <div>
      <Pronounc data={data}/>
      {elementsAr}
    </div>
  );

}

export function ShowMeriamWebsterL(){
  const dictState=useSelector(state => state.dicts.meriamL);
  // console.log("Meriam-Webster redux store: ", dictState);
  if(!dictState){return;}
  if(!dictState?.data){return;}

  return(
    <div>
      <ShowLearners/>
    </div>
  );
}

export function ShowMeriamWebsterC(){
  const dictState=useSelector(state => state.dicts.meriamC);
  // console.log("Meriam-Webster redux store: ", dictState);
  if(!dictState){return;}
  if(!dictState?.data){return;}

  return(
    <div>
      <ShowCollegiate/>
    </div>
  );
}