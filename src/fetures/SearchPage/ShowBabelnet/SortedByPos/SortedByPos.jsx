import { useSelector } from 'react-redux';
import { TextResultUnit } from '../../../../components/TextResultUnit';

const sources = ['WN', 'WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WIKT', 'WIKTLB'];
const sources0 = ['WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WIKT', 'WIKTLB'];
const sources1 = ['WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WN'];
const sources2 = ['WIKI', 'WIKIDIS', 'WIKIDATA', 'OMWIKI', 'WIKTLB'];

function Examples({ data }){

  if(!data.length){return;}
  const parametres = useSelector((state) => state.parameters.sources);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);
  const classes = ' '+data.dict + ' '+themeName+' ';
  const examplesAr = data.map((obj, index) => {
    const sourcesList = parametres.wordnet.checked ? sources0 : sources;
    if(!sourcesList.includes(obj.source)){return;}
    return(
      <p key={'babelNetExample'+index}>{index+1+'. '+obj.example+' ('+obj.source+')'}</p>
    );
  });
  const filtredExamples = examplesAr.filter(obj => obj!==undefined);
  if(filtredExamples.length<1){return;}
  return (
    <TextResultUnit
      head={<p className={'defExamples'+classes}>{'Examples ('+filtredExamples.length+')'}</p>}
      type="2"
      expanded={false}
      className={'defExamples'+classes}
    >
      {filtredExamples}
    </TextResultUnit>
  );

}

function Defs({ data, domain=null }){
  const parametres = useSelector((state) => state.parameters.sources);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);
  const classes = ' '+data.dict + ' '+themeName+' ';
  let counter = 0;
  const elementsAr = data.map((obj, index) => {
    let sourcesList = sources;
    if (parametres.wordnet.checked){sourcesList=sources0;}
    if (parametres.wordnik.checked){sourcesList=sources1;}
    if (parametres.wordnik.checked && parametres.wordnet.checked){sourcesList=sources2;}

    if(!sourcesList.includes(obj.source)){return;}
    counter +=1;

    return(
      <div key={obj.source+index} >
        <p className={'defBody'+classes}>{counter+'. '+obj.gloss}
          <span className='babelnetDefSource'>{' ('+obj.source+')'}</span>
        </p>
      </div>
    );
  });
  const filteredElementsAr = elementsAr.filter(obj => obj!==undefined);

  const length = filteredElementsAr.length;
  return (
    <div key={'bblntdfrn_'+counter}>
      {length>0 && <p>{domain}</p>}
      {filteredElementsAr[0]}
      {length>1 &&
                <TextResultUnit
                  type="2"
                  expanded={false}
                  head={<p className={'defHead'+classes}>{'show more definitions ('+(length-1)+')'}</p>}
                  className={'defHead'+classes}
                >
                  {filteredElementsAr.slice(1)}
                </TextResultUnit>
      }

    </div>
  );
}

export function SortedByPos(){
  const dictState = useSelector((state) => state.dicts.babelnet);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);
  const classes = ' '+dictState.dict + ' '+themeName+' ';
  console.log('BabelNet redux store', dictState);
  if(!dictState?.data){return;}
  const elementsAr = Object.keys(dictState.data.sortedByPos).map(key => {
    if(!dictState.data.sortedByPos[key][0]){return;}
    const obj=dictState.data.sortedByPos[key];
    let synsets;
    if(key==='noun'){
      const nouns = { other: [], named: [] };
      for (let el of obj){
        if (el.synsetType==='NAMED_ENTITY'){nouns.named.push(el);}
        else{nouns.other.push(el);}
      }
      // console.log('nouns', nouns);
      const otherAr = nouns.other.map((synset) => {
        let domain = null;
        if (synset?.domains){
          domain = Object.keys(synset.domains)[0];

        }
        if (typeof(domain)==='string'){
          domain = domain.replaceAll('_', ' ');
        }
        return(
          <div key={synset.id}>
            <Defs data={synset.glosses} domain={domain}/>
            <Examples data={synset.examples}/>
          </div>
        );
      });
      const namedAr = nouns.named.map((synset) => {
        // console.log('synset', synset);
        let domain = null;
        if (synset?.domains){
          domain = Object.keys(synset.domains)[0];

        }
        if (typeof(domain)==='string'){
          domain = domain.replaceAll('_', ' ');
        }
        return(
          <div key={synset.id}>
            <Defs data={synset.glosses} domain={domain}/>
            <Examples data={synset.examples}/>
          </div>
        );
      });
      return (

        <TextResultUnit
          key={key+'babelnet'}
          head={<p> {key} </p>}
          type='1'
          className={'standartTRU2'+classes}
          expanded={true}
        >
          <div className="babelnetNouns" key={'TRYcontent'+key}>
            {otherAr}
            <TextResultUnit
              head={`Named entities (${namedAr.length})`}
              type='2'
              className={'standartTRU2'+classes}
              expanded={false}
            >
              {namedAr}
            </TextResultUnit>
          </div>
        </TextResultUnit>


      );

    }
    else{
      synsets = obj.map((synset) => {
        let domain = null;
        if (synset?.domains){
          domain = Object.keys(synset.domains)[0];

        }
        if (typeof(domain)==='string'){
          domain = domain.replaceAll('_', ' ');
        }
        return(
          <div key={synset.id}>
            <Defs data={synset.glosses} domain={domain}/>
            <Examples data={synset.examples}/>
          </div>
        );
      });
    }


    return(
      <div key={key+'bblnt'}>
        <TextResultUnit
          head={<p> {key} </p>}
          type='1'
          color='color2'
          expanded={true}
        >
          {synsets}
        </TextResultUnit>
      </div>
    );
  });

  return elementsAr;
}