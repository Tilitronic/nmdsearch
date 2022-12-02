import './SearchPage.scss';

import { useSelector } from 'react-redux';

import { DisplayElement } from './DisplayElement';
import { ShowBabelnet } from './ShowBabelnet/ShowBabelnet';
import { ShowUrbanDict } from './ShowUrbanDict';
import { ShowWordnet } from './ShowWordnet';
import { ShowWordnik } from './ShowWordnik';
import { ShowMeriamWebsterC, ShowMeriamWebsterL } from './ShowMeriamWebster';

export function SearchPage(){
  const dictsState = useSelector((state) => state.dicts);
  const dictsParam = useSelector((state) => state.parameters.sources);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);


  return (
    <div className={'SrPg pageElementsWrapper '+themeName}>
      {
        Object.values(dictsParam).map((element, index) => {
          if(!element.checked){return null;}
          if(!dictsState[element.name]){return null;}
          let sourceElement;
          switch (element.name) {
          case 'urban':
            sourceElement = <ShowUrbanDict/>;
            break;
          case 'wordnet':
            sourceElement = <ShowWordnet/>;
            break;
          case 'wordnik':
            sourceElement = <ShowWordnik/>;
            break;
          case 'babelnet':
            sourceElement = <ShowBabelnet/>;
            break;
          case 'meriamL':
            sourceElement = <ShowMeriamWebsterL/>;
            break;
          case 'meriamC':
            sourceElement = <ShowMeriamWebsterC/>;
            break;
          default:
            return null;
          }
          return (
            <DisplayElement name={element.label} key={'display'+index+element.name}>
              {sourceElement}
            </DisplayElement>
          );
        })
      }
    </div>
  );
}