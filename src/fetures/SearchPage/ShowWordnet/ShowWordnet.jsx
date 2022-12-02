import { useSelector } from 'react-redux';
import { TextResultUnit } from '../../../components/TextResultUnit';

export function ShowWordnet(){
  const data = useSelector((state) => state.dicts.wordnet);
  console.log('redux state wordnet', data);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);
  const classes = ' '+data.dict + ' '+themeName+' ';

  if (!data?.list){return;}
  const dictDataAr = data.list.map((obj) => {
    const partOfSpeech = obj.pos;

    const uniqueSynonims = obj.synonyms.filter((syn) => syn!==obj.lemma);
    const synonymsElements = uniqueSynonims.map((syn, index) => {
      const synonym = syn.replaceAll('_', ' ');
      return(
        <p key={index+'synonym'+obj.synsetOffset}>
          {synonym}
        </p>
      );

    });
    const examplesElements = obj.exp.map((exp, index) => {
      return(
        <div key={index+'example'+obj.synsetOffset}>
          <p> {exp} </p>
        </div>
      );
    });

    return(
      <TextResultUnit
        key={obj.synsetOffset}
        className={'defHead '+classes}
        head={
          <p className={'defHead'+classes}>
            {obj.lemma.replaceAll('_', ' ')} {partOfSpeech ? '('+partOfSpeech+')' : null}
          </p>
        }
        type='1'
        expanded={true}
      >

        <div >
          <p className={'defBody'+classes}>
            {obj.def}
          </p>
        </div>
        {obj.exp.length>0 &&
                <TextResultUnit
                  className={'defExamples '+classes}
                  head={
                    <p className={'defExamples '+classes}>
                      {`Examples (${obj.exp.length})`}
                    </p>
                  }
                  type='2'
                  expanded={true}
                >
                  <div className="divExamples">
                    {examplesElements}
                  </div>
                </TextResultUnit>
        }
        {obj.synonyms.length>1 &&
                    <TextResultUnit
                      className={'defSynonyms'+classes}
                      head={<p className={'defSynonyms'+classes}>{'Synonyms ('+synonymsElements.length+')'}</p>}
                      type='2'
                      expanded={false}
                    >
                      <div>
                        {synonymsElements}
                      </div>
                    </TextResultUnit>
        }
      </TextResultUnit>
    );
  });
  return(
    <div>
      <div>
        {dictDataAr}
      </div>

    </div>
  );

}