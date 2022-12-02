import styles from './ShowWordnik.scss';

import { useSelector } from 'react-redux';

import parse from 'html-react-parser';

import { TextResultUnit } from '../../../components/TextResultUnit';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function makeALink(phrase, link){
  return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`;
}

function Definitions(){
  const data = useSelector((state) => state.dicts.wordnik);
  const sources = useSelector(state => state.parameters.sources);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  const classes = ' '+data.dict + ' '+themeName+' ';

  if(!data?.definitions){
    return;
  }
  const defData = useSelector((state) => state.dicts.wordnik.definitions);

  const reactElementsAr = defData.map((origin, index) => {
    const originTitle = origin.name;
    const originLink = makeALink(originTitle, origin.url);
    const definitionsElements = origin.typesOfDefinitions.map(typeOfDef => {
      const defRawTitle = typeOfDef.word+' ('+typeOfDef.partOfSpeech+')';
      const defTitle = makeALink(defRawTitle, typeOfDef.url);

      const definitionsAr = typeOfDef.definitions.map((obj, index) => {
        const word = makeALink(obj.word, obj.wordnikUrl);
        const attribution = makeALink(obj.attributionText, obj.attributionUrl);
        const xmlDefText = obj.text;
        const regexForStripHTML = /<(.|\n)*?>/ig;
        const stripText = xmlDefText.replaceAll(regexForStripHTML, '');
        return(
          <div key={obj.id ? obj.id : 'wordnikDef'+obj.sourceDictionary+index}>
            <div className={'defBody'+classes}>
              <p>
                {index+1+'. '+parse(stripText)}
              </p >
            </div>
          </div>
        );});

      return(
        <TextResultUnit
          key={'wordnikDefType'+typeOfDef.id}
          className={'defHead '+classes}
          type='1'
          expanded={true}
          head={
            <p className={'defHead'+classes}>
              {parse(defTitle)}
            </p>
          }
        >
          {definitionsAr}
        </TextResultUnit>
      );
    });
    const expanded = origin.source==='wordnet' ? !sources.wordnet.checked && !sources.babelnet.checked : true;

    // if(parametres.wordnet.checked===true && origin.source!=='wordnet')
    return (
      <TextResultUnit
        key={'wordnikSource'+origin.url}
        // color='white'
        className={'dictBody'+classes}
        head={<p>{parse(originLink)}</p>}
        type='1'
        expanded={expanded}
      >
        <div className="definitions">
          {definitionsElements}
        </div>
      </TextResultUnit>

    );
  });
  return(
    <div>
      {reactElementsAr}
    </div>
  );
}

function Prononuc(){
  const data = useSelector((state) => state.dicts.wordnik);
  if(!data?.pronunciations){
    return;
  }
  function handleClick(url){
    if (window.event.ctrlKey) {
      window.open(url, '_blank');
      return;
    }
  }
  const pronData = useSelector((state) => state.dicts.wordnik.pronunciations);
  function getIpa(ar){
    for(let obj of ar){
      if(obj.rawType==='IPA'){
        return obj;
      }
    }
  }
  const ipa = getIpa(pronData);
  if (!ipa?.raw){return;}
  return(
    <p title={ipa.attributionText+' Ctrl+click to see license'} onClick={() => handleClick(ipa.attributionUrl)}>{ipa.raw}</p>
  );
}

function Audio (){
  const data = useSelector((state) => state.dicts.wordnik);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  if (!data.audio){return;}
  const audioElements=data.audio.map(obj => {
    const fileUrl = obj.fileUrl;
    function handleClick(id, url){
      if (window.event.ctrlKey) {
        window.open(url, '_blank');
        return;
      }
      const audioEl = document.getElementById(id);
      audioEl.play();
    }
    return(
      <div key={obj.id}>
        <button className={'wordnik audioButton '+themeName}
          title={obj.attributionText.replaceAll('--', '—')+'. Ctrl+click to see original source'}
          onClick={() => handleClick(obj.id, obj.attributionUrl)}

        >
          <PlayCircleIcon color="iconButton"/>
        </button>
        <audio id={obj.id}>
          <source src={fileUrl} type='audio/mpeg'/>
                    Your browser does not support the audio element.
        </audio>
      </div>
    );
  });
  return(
    <div className="wordnik audioElements">
      {audioElements}
    </div>
  );
}

export function ShowWordnik(){
  const data = useSelector((state) => state.dicts.wordnik);
  if(!data){return null;}

  console.log('redux state wordnik', data);

  return (
    <div>
      <div className='wordnik pronouncAndAudioWrapper'>
        <Prononuc/>
        <Audio/>
      </div>

      {data.definitions && <Definitions/>}

    </div>
  );
}